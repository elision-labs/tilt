import React, { useState } from 'react'
import { registryAbi } from '@/lib/abi/ChallengeRegistry'
import { useWriteContract } from 'wagmi'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CreateChallenge() {
    const { writeContract } = useWriteContract();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');

    const handleCreateChallenge = () => {
        writeContract({
            abi: registryAbi,
            address: '0x17976411b5CbdE3b6EB47B8BB43c94C0f0306aa5',
            functionName: 'createChallenge',
            args: [title, description, imageLink],
        });
    };

    return (
        <div className="max-w-md mx-auto p-4 space-y-4">
            <div>
                <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                />
            </div>
            <div>
                <Input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full"
                />
            </div>
            <div>
                <Input
                    type="url"
                    placeholder="Image link"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    className="w-full"
                />
            </div>
            <Button onClick={handleCreateChallenge} className="w-full">Create Challenge</Button>
        </div>
    );
}
