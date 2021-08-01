import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="About Turtle Boost" />
      <div id="about">
        <h2>Dodi258 & Turtle Boost Starter</h2>
        <br></br>
        <p>
          <strong>Dodi258</strong> : 블로그 글쓴이
          <br></br>
          
        </p>

        <p>
          <strong>Turtle Boost Starter 🚀 </strong>는
          <br></br>
          개발 공부를 하면서
          <br></br>
          - 어려웠던 것,
          <br></br> 
          - 공부했던 내용,
          <br></br> 
          - 기억하고 싶은 것,
          <br></br>
          - 공유하고 싶은 것,
          <br></br> 
          - 이것 저것
          <br></br> 
          실력을 부스트 시킬 기록을 차근차근 남기는 곳입니다.
          <br></br>
        </p>


        {/* <p>
          This starter is a great way to get blogging using a content manager
          while learning and practicing <strong>JavaScript</strong>,{" "}
          <strong>React</strong>, <strong>Gatsby</strong>, and{" "}
          <strong>GraphQL</strong>,
        </p> */}

        {/* <div className="about-icons">
          <span role="img" aria-label="Laptop.">
            💻
          </span>
          <span role="img" aria-label="Rocket.">
            🚀
          </span>
        </div>

        <h3>Thanks for visiting!!</h3> */}
      </div>
    </Layout>
  )
}
export default AboutPage
