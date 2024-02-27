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
import { AwardChallenge } from "./awardChallenge"


type ChallengeRowProps = {
    address: `0x${string}`
}
function ChallengeRow({ address }: ChallengeRowProps) {
    const details = useReadContract({
        address,
        abi: tokenAbi,
        functionName: 'getChallengeDetails'
    })

    const awardedCount = useReadContract({
        address,
        abi: tokenAbi,
        functionName: 'getChallengesAwarded'
    })

    return (
        <TableRow key={address}>
            {
                details.isPending || awardedCount.isPending ?
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
                            details.data &&
                            <>
                                <TableCell className="font-medium">{details.data[0]}</TableCell>
                                <TableCell>{details.data[1]}</TableCell>
                                <TableCell>
                                    <a href={details.data[2]} target="_blank" rel="noopener noreferrer">
                                        {details.data[2]}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    {awardedCount.data?.toString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <AwardChallenge address={address} />
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
    const { data: challenges, isPending } = useReadContract({
        address: '0x17976411b5CbdE3b6EB47B8BB43c94C0f0306aa5',
        abi: registryAbi,
        functionName: 'getOwnedChallenges',
        account: walletClient?.account,
    })

    console.log('Challenges: ', challenges)

    return (
        <Table>
            <TableCaption>A list of your challenges</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>ImageURL</TableHead>
                    <TableHead># Awarded</TableHead>
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
        </Table>
    )
}
