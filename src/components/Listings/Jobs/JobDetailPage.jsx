import React from "react";
import { Phone, MapPin, CalendarClock, Clock, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

function JobDetailPage() {
  const { id } = useParams(); // This will retrieve the 'id' from the URL
  console.log(id);
  const job = {
    title: "Part-Time Front-End Developer at XYZ Corp",
    company: "XYZ Corp",
    location: "Flushing, NY",
    salary: "$20 - $30 per hour",
    employmentType: "Part-Time",
    hourlyRate: true,
    description:
      "Join our growing tech team at XYZ Corp as a Front-End Developer. Work on cutting-edge technologies and innovative projects while collaborating with talented developers and designers.",
    requirements: [
      "Experience with React and Redux",
      "Solid understanding of HTML, CSS, and JavaScript",
      "Familiarity with RESTful APIs",
      "Good problem-solving skills",
    ],
    postedAt: "2025-07-21",
    contactPhone: "(123) 456-7890",
    contactEmail: "jobs@xyzcorp.com",
    address: "147-ga/19 Avenue 1st Floor, Flushing, NY",

    checkOnly: true, // New condition for the checkbox
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Job Information) */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <h2 className="text-xl text-gray-600">{job.company}</h2>
          <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
            <MapPin size={16} />
            <span>{job.location}</span>
            <CalendarClock size={16} />
            <span>{job.postedAt}</span>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Job Description</h3>
            <p className="mt-2">{job.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Requirements</h3>
            <ul className="mt-2 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add map link */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Location</h3>
            <div className="mt-2">
              <p>{job.address}</p>{" "}
            </div>
          </div>

          {/* New checkbox option */}
          <div className="mt-6 flex items-center space-x-2">
            {job.checkOnly && (
              <>
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-lg">Check Only</span>
              </>
            )}
          </div>
        </div>

        {/* Right Column (Sidebar with Contact Info & Salary) */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Employment Type</h3>
            <p className="text-lg font-bold">{job.employmentType}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Hourly Pay</h3>
            <p className="text-lg font-bold">{job.salary}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Contact Info</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Phone size={16} />
              <span>{job.contactPhone}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <a href={`mailto:${job.contactEmail}`} className="text-blue-500">
                {job.contactEmail}
              </a>
            </div>
          </div>

          <Link
            to="/apply"
            className="w-full py-2 text-center text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;
