"use client"

export default function Resume() {
  return (
    <div className="bg-white w-full max-w-4xl mx-auto my-16 p-10 shadow-lg rounded-lg">
      <header className="mb-8 text-center border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">Tejas Kothari</h1>
        <p className="text-gray-600">Full Stack Developer | San Francisco, CA</p>
        <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
          <span>contact@example.com</span>
          <span>•</span>
          <span>(555) 123-4567</span>
          <span>•</span>
          <span>github.com/tejaskothari</span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Summary</h2>
        <p className="text-gray-700">
          Full Stack Developer with 5+ years of experience building modern web applications. 
          Specializing in React, Node.js, and TypeScript with a focus on creating intuitive and responsive user interfaces.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Experience</h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold">Observe.AI</h3>
            <span className="text-sm text-gray-500">2020 - Present</span>
          </div>
          <h4 className="text-gray-700 italic mb-1">Senior Software Developer</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Led development of customer-facing dashboard using React and TypeScript</li>
            <li>Improved page load performance by 40% through code optimization</li>
            <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
          </ul>
        </div>

        <div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold">Tech Innovators Inc.</h3>
            <span className="text-sm text-gray-500">2018 - 2020</span>
          </div>
          <h4 className="text-gray-700 italic mb-1">Full Stack Developer</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Developed RESTful APIs using Node.js and Express</li>
            <li>Created responsive web applications with React and Redux</li>
            <li>Collaborated with design team to implement UI/UX improvements</li>
          </ul>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-1">Frontend</h3>
            <p className="text-gray-700">React, Next.js, TypeScript, Tailwind CSS</p>
          </div>
          <div>
            <h3 className="font-bold mb-1">Backend</h3>
            <p className="text-gray-700">Node.js, Express, MongoDB, PostgreSQL</p>
          </div>
          <div>
            <h3 className="font-bold mb-1">DevOps</h3>
            <p className="text-gray-700">Docker, Kubernetes, AWS, CI/CD</p>
          </div>
          <div>
            <h3 className="font-bold mb-1">Other</h3>
            <p className="text-gray-700">Git, Agile Methodology, Unit Testing</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Education</h2>
        <div className="flex justify-between items-baseline">
          <h3 className="font-bold">BS in Computer Science</h3>
          <span className="text-sm text-gray-500">2014 - 2018</span>
        </div>
        <p className="text-gray-700">University of Technology</p>
      </section>
    </div>
  )
}