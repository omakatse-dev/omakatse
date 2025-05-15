import React from 'react';

export default function TnC() {
  return (
    <div className="bodySM flex flex-col gap-8 pl-4 text-gray-500">
      <ul className="list-outside list-disc">
        <li>Minimum review length is 20 characters</li>
        <li>All fields must not contain special characters or emojis</li>
        <li>All fields must not contain inappropriate language</li>
        <li>Images must be less than 1MB</li>
      </ul>
      <ul className="list-outside list-disc">
        <li>
          I agree that Personal Data relating to my product ratings and review,
          which may include my name, username, rating, review and country, may
          be shared and/or disclosed by Omakatse, including in any Omakatse
          stores, on websites and/or on the mobile app, and with third parties,
          for administrative, fraud prevention, publicity and/or promotional
          purposes. Further details of which are set out in the Privacy Policy I
          have previously consented to.
        </li>
      </ul>
    </div>
  );
}
