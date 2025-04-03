import React from 'react'

const EmailDomainRequestor = ({ tickets }) => {
    
    const emailDomainRequestor = tickets.reduce((acc, ticket) => {
        const email = ticket["Requestor Email"];
        const domain = email.substring(email.indexOf("@"));
        acc[domain] = (acc[domain] || 0) + 1;
        return acc;
    }, {});
  return (
    <div>
        {Object.entries(emailDomainRequestor).map(([domain,  count]) => (
            <>
            <h1>{domain} </h1>
            <span>{count} </span>
            <p>Tickets</p></>
        ))}
    </div>
  )
}

export default EmailDomainRequestor;