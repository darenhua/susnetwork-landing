import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NetworkGraph } from "./Network";
import Sus from "./Sus";
import Link from "next/link";

export default function Home() {
    return (
        <div className="grid grid-cols-3 grid-rows-4 sm:grid-rows-2 items-center justify-items-center min-h-screen p-2 max-w-6xl mx-auto gap-2">
            <div className="md:col-span-1 col-span-3 sm:my-0 my-12 max-w-96 row-span-1 w-full h-full flex justify-center flex-col">
                <div className="text-4xl font-londrina">Let's Map Out</div>
                <div className="relative">
                    <Sus
                        className="absolute -top-2 right-3"
                        width={25}
                        height={25}
                    />
                    <div className="text-6xl font-londrina text-white mt-3 font-semibold px-3 mr-3 bg-custom-accent">
                        YC AI Startup School
                    </div>
                </div>
                <div className="mt-8">
                    <Button className="bg-white text-custom-accent border-2 hover:text-white border-custom-accent shadow-md cursor-pointer text-lg font-semibold  transform transition-all ease-linear duration-[10000ms] hover:pr-[200px] hover:shadow-lg active:scale-95 origin-left">
                        <Link href="signup">Let's gooooooo</Link>
                    </Button>
                </div>
            </div>
            <div className="md:block hidden col-span-2 relative row-span-1 border-8 border-stone-900/5 bg-stone-600/5 w-full h-full">
                <NetworkGraph />
                {/* <Image
                    src="/phone.png"
                    width={100}
                    height={100}
                    alt="phone"
                    className="absolute -bottom-1 overflow-hidden scale-x-[-1] right-20 w-32"
                /> */}

                <Sus
                    className="absolute -bottom-1 scale-x-[-1] left-12"
                    width={20}
                    height={20}
                />
            </div>
            <div className="col-span-3 sm:col-span-1 flex flex-col row-span-1 px-3 py-1 bg-stone-600/5 w-full h-full">
                <div className="text-2xl font-londrina  mt-3 font-semibold">
                    Mapping out the event
                </div>
                <p className="text-sm text-stone-600 font-medium mt-3 mr-12">
                    The goal is to create a graph visualization of all 2k
                    attendees at YC AI Startup School and we're all related to
                    each other.
                </p>
                <p className="text-sm text-stone-600  font-medium mt-2 mr-12">
                    The idea is: say we individually meet 30 people at the
                    conference, and 100 people share their 30 people they've
                    met, then combined we can map the SUS network.
                </p>
                <div className="flex-1 flex flex-col justify-end">
                    <div className="pattern w-full h-full mt-6 mb-3"></div>
                </div>
            </div>
            <div className="col-span-3 sm:col-span-1 row-span-1 px-3 py-1 flex flex-col bg-stone-600/5 w-full h-full">
                <div className="text-2xl font-londrina mt-3 font-semibold">
                    Relevant Conversation Starters
                </div>
                <p className="text-sm text-stone-600 font-medium mt-3 mr-12">
                    As you meet kids at AI SUS, you show a QR code, and that
                    adds them to your graph.
                </p>
                <p className="text-sm text-stone-600  font-medium mt-2 mr-12">
                    Let's say you meet Alex and you already scanned Jane into
                    your network. Since Alex is connected with Jane in the
                    graph, you say, "Oh alex do you know Jane cuz she goes to
                    Columbia too!"
                </p>
                <div className="flex-1 flex flex-col justify-end">
                    <div className="pattern w-full h-full mt-6 mb-3"></div>
                </div>
            </div>
            <div className="col-span-3 sm:col-span-1 row-span-1 px-3 py-1 bg-stone-600/5 flex flex-col w-full h-full">
                <div className="text-2xl font-londrina  mt-3 font-semibold">
                    <span>Post SUS</span>
                    <Sus className="inline-block mr-1" width={20} height={20} />
                    <span>Value</span>
                </div>
                <p className="text-sm text-stone-600 font-medium mt-3 mr-12">
                    Post SUS, I'll combine everyone's network and map out all 2k
                    attendees. I'm gonna add features that help us stay in
                    touch.
                </p>
                <p className="text-sm text-stone-600 font-medium mt-2 mr-12">
                    It's still TBD but I'm thinking of something like{" "}
                    <Link
                        target="_blank"
                        href="https://www.boardy.ai/"
                        className="text-custom-accent font-semibold"
                    >
                        boardy.ai
                    </Link>{" "}
                    but for the AI SUS network.
                </p>
                <div className="flex-1 flex flex-col justify-end">
                    <div className="pattern w-full h-full mt-6 mb-3"></div>
                </div>
            </div>
        </div>
    );
}
