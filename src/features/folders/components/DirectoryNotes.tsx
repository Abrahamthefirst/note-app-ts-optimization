import React from 'react';

const DirectoryNotes = () => {
  return (
    <section className="w-full bg-white">
      <CreateDirectoryForm />
      <section className="flex w-full p-8">
        {directoriesResponseData.map((directoryData) => {
          return (
            <div className="relative gap-10" key={directoryData.id}>
              <DirectoryImage directoryData={directoryData} />
              <DeleteFolder directoryId={directoryData.id} />
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default DirectoryNotes;
