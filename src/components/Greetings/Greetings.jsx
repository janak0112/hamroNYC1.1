import React from 'react'

function Greetings() {
    return (
        <section class="flex flex-col items-center justify-start  px-6 py-16 custom-gradient">
        <div class="flex flex-col items-center max-w-4xl w-full">
            <h1 class="text-5xl md:text-6xl font-bold text-white text-center leading-tight mb-4">
                Welcome to XXX
            </h1>
            <p class="text-base text-white text-center max-w-2xl mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente iste consectetur, placeat suscipit pariatur nobis voluptatem optio assumenda repellat officia porro incidunt quos itaque? Incidunt cumque harum obcaecati culpa fuga, amet explicabo quos ipsam, quia error necessitatibus odio! Atque distinctio officia laudantium voluptatem. Omnis repudiandae quidem autem optio repellat minus.
            </p>
            <button class=" text-white font-semibold text-lg py-3 px-8 rounded-md custom-primary-bg">
                Post Your First Listing
            </button>
        </div>
    </section>
    )
}

export default Greetings
