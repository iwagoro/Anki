"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/provider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame } from "lucide-react";
import { P } from "@/components/ui/typography";
export default function Dashboard() {
    const { user } = useContext(AppContext);
    const [streakMessage, setStreakMessage] = useState<React.ReactNode>(null);

    useEffect(() => {
        if (user.streak === 0) {
            setStreakMessage(<P className="pt-2 text-[red]">You haven't started yet!</P>);
        } else if (user.streak === 1) {
            setStreakMessage(<P className="pt-2 text-[red]">You're on a 1-day streak!</P>);
        } else if (user.streak > 10) {
            setStreakMessage(<P className="pt-2 text-[green]">You're on a {user.streak}-day streak</P>);
        } else {
            setStreakMessage(<P className="pt-2 text-[cyan]">You're on a {user.streak}-day streak!</P>);
        }
    }, [user.streak]);

    return (
        <div className="w-full grid grid-cols-2 gap-5">
            <Card className="w-full">
                <CardHeader className="flex-row items-center">
                    <Trophy size={40} className="mr-3" />
                    <div>
                        <CardDescription>Today's Progress</CardDescription>
                        <CardTitle>Today : {user.total} words</CardTitle>
                        <CardDescription className="pt-2">Goal : {user.goal}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Progress value={(user.total / user.goal) * 100} />
                </CardContent>
            </Card>
            <Card className="w-full h-fit">
                <CardHeader className="flex-row items-center">
                    <Flame size={40} className="mr-3" />
                    <div>
                        <CardDescription>Streak</CardDescription>
                        <CardTitle>{user.streak} days</CardTitle>
                        <CardDescription>{streakMessage}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
