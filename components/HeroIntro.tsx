/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'

// TODO: read intro from headless cms (md file)
const HeroIntro = () => {
  return (
    <>
      <section className="bg-white mt-20">
        <div className="max-w-2xl px-6 text-center mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800">
            Hi,{' '}
            <span className="bg-indigo-600 text-white rounded px-1">
              I’m Dung Huynh Duc
            </span>{' '}
            . Nice to meet you.
          </h2>
        </div>
      </section>
      <section className="bg-gray-800 pattern py-20">
        <div className="max-w-5xl px-6 mx-auto text-center">
          <h2 className="text-2xl font-semibold text-white">About Me</h2>
          <p className="text-gray-400 mt-4">
            I’m a full stack developer. I’m a fast learner and self-taught
            coder. I often take my time for researching and learning about hot
            and trending technology.
          </p>
        </div>
      </section>
    </>
  )
}

export default HeroIntro
