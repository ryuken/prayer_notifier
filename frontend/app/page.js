"use client"
import React, { Suspense } from 'react'

import { MapPin, StopCircle, Quote } from "lucide-react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import Clock from "@/components/Clock"

import { items as prayers, nextPrayer } from "@/stores/Prayers"
import { items as reminders } from "@/stores/Reminders"
import { City, stop } from "@/stores/Config"

const Home = () => {

    return (
        <div className="flex justify-center">
            <div className="flex flex-col mt-6 md:flex-row md:max-w-xl rounded-lg bg-white  bg-opacity-80 shadow-lg">

                <div className="p-6 flex justify-center w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg">
                    <div className='self-center flex-col text-center'>
                        <h1 className="text-xl font-large">
                            {nextPrayer.value}
                        </h1>
                        <div>
                            {prayers.value[nextPrayer.value]}
                        </div>
                        <StopCircle className="cursor-pointer text-2xl" onClick={stop} />
                    </div>
                </div>

                <div className="py-6 flex flex-col justify-center items-center">
                    <div className='flex'>
                        <MapPin className="mr-2 text-2xl" />
                        {City.value}
                    </div>

                    <Suspense key={new Date().getTime()}>
                        <Clock />
                    </Suspense>

                    <div className='p-3 flex flex-col justify-center'>
                        <Quote className='mr-2' />

                        <Carousel
                            className="w-full max-w-sm"
                            opts={{ align: 'start', loop: true }}
                            plugins={[Autoplay({ delay: 10000 })]}
                        >
                            <CarouselContent>
                                {reminders.value.map((item, index) => (
                                    <CarouselItem key={item._id}>
                                        <p className="text-gray-700 text-base my-4">
                                            {item.content}
                                        </p>
                                        <p className="text-gray-600 text-xs">{item.source}</p>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext />
                            <CarouselPrevious />
                        </Carousel>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home