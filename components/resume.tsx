"use client"

export default function Resume() {
  return (
    <div className="bg-white w-full max-w-4xl mx-auto my-16 p-10 shadow-lg rounded-lg">
      <header className="mb-8 text-center border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">Tejas Kothari</h1>
        <p className="text-gray-600">Software Engineer | Bengaluru, KA</p>
        <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
          <span>https://www.linkedin.com/in/tejaskothari03/</span>
          <span>•</span>
          <span>•</span>
          <span>github.com/tejas-k3</span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Summary</h2>
        <p className="text-gray-700">
          Backend Developer with 3+ years of experience and enthusiasm for building apps!!! 
          </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Experience</h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold">Software Development Engineer II @ Observe.AI</h3>
            <span className="text-sm text-gray-500">Nov 24 - Present</span>
          </div>
          <h4 className="text-gray-700 italic mb-1">Software Developement Engineer II</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Instrumented custom backend metrics and developed Helm charts for logs & metric-based alerts, enhancing real-time observability and proactive incident response at application level and platform level.</li>
            <li>Enhanced observability and debugging by developing context-enriched logs streamlining issue identification and resolution in asynchronous environments. </li>
            <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
          </ul>
        </div>

        <div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold">1mg</h3>
            <span className="text-sm text-gray-500">Mar 2024 - Nov 2024</span>
          </div>
          <h4 className="text-gray-700 italic mb-1">Software Developement Engineer II</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Decomposed Catalog Management microservice from Ruby on Rails monolith architecture to Python & Sanic Framework bringing many Catalog affiliated APls P99 latency down by 40%.</li>
            <li>Implemented Tenant Management microservice to support multi-tenant architecture.</li>
            <li>Designed a new schema to right-size database aligning with the SaaS model, ensuring efficient data storage and retrieval.</li>
            <li>Worked on transitioning from Monolith to Modular Monolith utilising Rails engine via mono repo structure, setting clear leadership and boundaries with independent module development</li>
            <li>Worked on Ruby version bump for the ODIN application from v2.6 to v3.2 enhanced by YJIT leading to 20% improvement in the p99 response time, 50% reduction in CPU utilisation and 35% reduction in memory consumption.</li>
          </ul>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* <div>
            <h3 className="font-bold mb-1">Frontend</h3>
            <p className="text-gray-700">React, Next.js, TypeScript, Tailwind CSS</p>
          </div> */}
          <div>
            <h3 className="font-bold mb-1">Backend</h3>
            <p className="text-gray-700">Python, Java, FastAPI, Sanic, Django, MongoDB, PostgreSQL</p>
          </div>
          <div>
            <h3 className="font-bold mb-1">DevOps</h3>
            <p className="text-gray-700">Docker, Kubernetes, AWS, CI/CD</p>
          </div>
          <div>
            <h3 className="font-bold mb-1">Other</h3>
            <p className="text-gray-700">Git, Agile Methodology, Integration & Load Testing</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Education</h2>
        <div className="flex justify-between items-baseline">
          <h3 className="font-bold">BTech in Computer Science</h3>
          <span className="text-sm text-gray-500">2017 - 2021</span>
        </div>
        <p className="text-gray-700">Vellore Institute of Technology</p>
      </section>
    </div>
  )
}