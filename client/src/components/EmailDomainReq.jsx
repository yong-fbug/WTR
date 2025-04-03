import React from 'react'

const EmailDomainRequestor = ({ tickets }) => {
    
    const emailDomainRequestor = tickets.reduce((acc, ticket) => {
        const email = ticket["Requestor Email"];
        const domain = email.substring(email.indexOf("@"));
        acc[domain] = (acc[domain] || 0) + 1;
        return acc;
    }, {});
  return (
    <div className='text-center bg-white border border-gray-200 shadow-md rounded-xl mx-10 mt-12'>
      <h5 className='text-2xl font-bold text-gray-800 p-4'>Tickets by Domain</h5>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 w-full mx-auto max-w-5xl mb-6 p-2'>
        {Object.entries(emailDomainRequestor).map(([domain,  count]) => (
            <section key={domain} className="email-domain-requestor p-2 text-center bg-white border border-gray-200 shadow-md rounded-xl hover:bg-gray-100 transition">
              <h1 className='text-lg font-semibold text-gray-600'>{domain} </h1>
              <p className='text-lg font-semibold text-gray-600'>Tickets</p>
              <p className='text-2xl font-bold text-gray-800'>{count} </p>
            </section>
        ))}
      </div>
    </div>
  )
}

export default EmailDomainRequestor;