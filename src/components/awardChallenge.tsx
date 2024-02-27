import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { tokenAbi } from "@/lib/abi/ChallengeToken"
import { useEffect, useState } from "react"
import { useWriteContract } from "wagmi"

type AwardChallengeProps = {
    address: `0x${string}`
}

export function AwardChallenge({ address }: AwardChallengeProps) {
    const { writeContractAsync } = useWriteContract()
    const [recipient, setRecipient] = useState<`0x${string}` | string>('')
    const [awarding, setAwarding] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState<string>('')

    const isValidAddress = (address: string) => {
        return /^0x[a-fA-F0-9]{40}$/.test(address)
    }

    const handleCreateChallenge = async () => {
        if (!isValidAddress(recipient)) {
            setError('Invalid address. Please try again')
            return
        }

        setAwarding(true)
        await writeContractAsync({
            abi: tokenAbi,
            address,
            functionName: 'mintChallengeToken',
            args: [recipient as `0x${string}`],
        })
        //TODO: handle user rejecting / errors
        setIsOpen(false)
        setAwarding(false)
        setError('')
    }

    useEffect(() => {
        if (isOpen) {
            setAwarding(false)
            setError('')
        }
    }, [isOpen])

    useEffect(() => {
        setError('')
    }, [recipient])

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button>Award Challenge</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Award challenge</DialogTitle>
                        <DialogDescription>
                            Enter the wallet address of the recipient of the newly minted NFT badge.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-4">
                            <Label htmlFor="name" className="text-left">
                                Recipient wallet address
                            </Label>
                            <Input
                                type="text"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                className="col-span-3"
                            />
                            {error &&
                                <Alert variant="destructive">
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                    {/* <AlertTitle>Error</AlertTitle> */}
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleCreateChallenge} disabled={!recipient || awarding}>{awarding ? 'Minting...' : 'Award challenge'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </div>
    )
}
