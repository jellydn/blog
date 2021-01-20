/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'

// TODO: read intro from headless cms (md file)
const HeroIntro = () => (
  <>
    <section className="mt-20 bg-white">
      <div className="max-w-2xl px-6 mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Hi,{' '}
          <span className="px-1 text-white bg-indigo-600 rounded">
            I’m Dung Huynh Duc
          </span>{' '}
          . Nice to meet you.
        </h2>
      </div>
    </section>
    <section className="py-20 bg-gray-800 pattern">
      <div className="max-w-5xl px-6 mx-auto text-center">
        <h2 className="text-2xl font-semibold text-white">About Me</h2>
        <p className="mt-4 text-gray-400">
          I’m a full stack developer. I’m a fast learner and self-taught
          coder. I often take my time for researching and learning about hot
          and trending technology.
        </p>
      </div>
    </section>
  </>
  )

export default HeroIntro
