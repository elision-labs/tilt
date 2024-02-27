"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useReadContract, useWalletClient } from 'wagmi'
import { registryAbi } from "@/lib/abi/ChallengeRegistry"
import { Loader2 } from "lucide-react"
import { tokenAbi } from "@/lib/abi/ChallengeToken"
import { Skeleton } from "@/components/ui/skeleton"


type ChallengeRowProps = {
    address: `0x${string}`
}
function ChallengeRow({ address }: ChallengeRowProps) {
    const { data: details, isPending, isError } = useReadContract({
        address,
        abi: tokenAbi,
        functionName: 'getChallengeDetails'
    })

    return (
        <TableRow key={address}>
            {
                isPending ?
                    <>
                        <TableCell >
                            <Skeleton className="h-4 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-full" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Button disabled>Award Challenge</Button>
                        </TableCell>
                    </>
                    :
                    <>
                        {
                            details &&
                            <>
                                <TableCell className="font-medium">{details[0]}</TableCell>
                                <TableCell>{details[1]}</TableCell>
                                <TableCell>{details[2]}</TableCell>
                                <TableCell className="text-right">
                                    <Button>Award Challenge</Button>
                                </TableCell>
                            </>
                        }
                    </>
            }

        </TableRow >
    )
}


export function ChallengeList() {
    const { data: walletClient } = useWalletClient()
    const { data: challenges, isPending, isError } = useReadContract({
        address: '0x17976411b5CbdE3b6EB47B8BB43c94C0f0306aa5',
        abi: registryAbi,
        functionName: 'getOwnedChallenges',
        account: walletClient?.account,
    })

    return (
        <Table>
            <TableCaption>A list of your challenges</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>ImageURL</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    isPending ?
                        <TableRow className="w-full">
                            <TableCell colSpan={4} className="w-full">
                                <div className="flex justify-center">
                                    <Loader2 className="h-8 w-8 animate-spin" />
                                </div>
                            </TableCell>
                        </TableRow>
                        :
                        <>
                            {challenges ? challenges.map((challenge) => (
                                <ChallengeRow address={challenge} />
                            ))
                                :
                                <p>You have no challenges</p>}
                        </>
                }
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    )
}
