import React from "react";

export default function TnC() {
  return (
    <div className="flex flex-col gap-8 bodySM text-gray-500 pl-4">
      <ul className="list-disc list-outside">
        <li>Minimum review length is 20 characters</li>
        <li>All fields must not contain special characters or emojis</li>
        <li>All fields must not contain inappropriate language</li>
      </ul>
      <ul className="list-disc list-outside">
        <li>
          I agree that Personal Data relating to my product ratings and review,
          which may include my name, username, rating, review and country, may
          be shared and/or disclosed by Sephora, including in any Sephora
          stores, on websites and/or on the mobile app, and with third parties,
          for administrative, fraud prevention, publicity and/or promotional
          purposes. Further details of which are set out in the Privacy Policy I
          have previously consented to.
        </li>
      </ul>
    </div>
  );
}
