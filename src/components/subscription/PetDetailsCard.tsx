import React from "react";
import Card from "../common/Card";
import Tag from "../common/Tag";

export default function PetDetailsCard() {
  return (
    <Card>
      <div className="flex flex-col">
        <div className="self-center flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-amber-300" />
          <h4>Bella</h4>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <div className="bodyMD text-gray-800">
            <span>Her details:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              <Tag>Girl</Tag>
              <Tag>Maine Coon</Tag>
              <Tag>Jan 2020</Tag>
              <Tag>Jan 2020</Tag>
              <Tag>Jan 2020</Tag>
              <Tag>Jan 2020</Tag>
            </div>
          </div>
          <div className="bodyMD text-gray-800">
            <span>Her details:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              <Tag>Girl</Tag>
              <Tag>Maine Coon</Tag>
              <Tag>Jan 2020</Tag>
              <Tag>Jan 2020</Tag>
              <Tag>Jan 2020</Tag>
              <Tag>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                placerat sollicitudin euismod. Aenean vestibulum
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
