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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registryAbi } from "@/lib/abi/ChallengeRegistry"
import { useEffect, useState } from "react"
import { useWriteContract } from "wagmi"

export function CreateChallenge() {
    const { writeContractAsync } = useWriteContract()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleCreateChallenge = async () => {
        setSubmitting(true)
        await writeContractAsync({
            abi: registryAbi,
            address: '0x17976411b5CbdE3b6EB47B8BB43c94C0f0306aa5',
            functionName: 'createChallenge',
            args: [title, description, imageLink],
        })
        //TODO: handle user rejecting / errors
        setIsOpen(false)
        setSubmitting(false)
    }

    useEffect(() => {
        if (isOpen) {
            setSubmitting(false)
        }
    }, [isOpen])

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button> Create Challenge</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create challenge</DialogTitle>
                        <DialogDescription>
                            Creating a challenge will deploy a contract for awarding completion NFT badges.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                                Title
                            </Label>
                            <Input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-left">
                                Description
                            </Label>
                            <Input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-left">
                                Image URL
                            </Label>
                            <Input
                                type="url"
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleCreateChallenge} disabled={!title || !description || !imageLink || submitting}>{submitting ? 'Submitting...' : 'Create challenge'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </div>
    )
}
