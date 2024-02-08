import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";

const UserDetails = () => {
  return (
    <div className="space-y-3">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold py-4">Intro</h2>
          <div className="flex flex-col space-y-4">
            <Button>Add Bio</Button>
            <Button>Edit details</Button>
            <Button>Add Featured</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between px-5 py-0.5">
          <h2 className="text-xl font-bold py-4">Photos</h2>
          <Button variant="ghost" className="font-medium text-md text-blue-500">
            See all photos
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between px-5 py-0.5">
          <h2 className="text-xl font-bold py-4">Friends</h2>
          <Button variant="ghost" className="font-medium text-md text-blue-500">
            See all friends
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
