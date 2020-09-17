import React from "react";
import { Uploady, useRequestPreSend } from "@rpldy/uploady";
import ChunkedUploady from "@rpldy/chunked-uploady";
import UploadButton from "@rpldy/upload-button";
import UploadDropZone from "@rpldy/upload-drop-zone";
import UploadPreview from "@rpldy/upload-preview";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";

const mockSenderEnhancer = getMockSenderEnhancer();

const ChunkedUploadButton = () => {
  useRequestPreSend((data) => {
    return {
      options: {
        destination: {
          headers: {
            "X-Unique-Upload-Id": `rpldy-chunked-uploader-${Date.now()}`,
          },
        },
      },
    };
  });

  return <UploadButton/>;
};

export default function Home() {
  return (
    <main>
      <h1>React Uploady on SSR</h1>

      <h2>Uploady</h2>
      <Uploady noPortal
               enhancer={mockSenderEnhancer}
               destination={{ url: "test.com" }}
      >

        <h3>Upload Button</h3>
        <UploadButton/>

        <h3>Upload Drop Zone</h3>
        <UploadDropZone
          extraProps={{ style: { width: "200px", height: "200px", border: "1px solid #000" } }}>
          <span>drag files in</span>
        </UploadDropZone>

        <UploadPreview previewComponentProps={{ width: "200px", height: "200px" }}/>
      </Uploady>

      <h2>Chunked Uploady</h2>
      <ChunkedUploady debug
                      noPortal
                      enhancer={mockSenderEnhancer}
                      destination={{ url: "test.com" }}
      >

        <h3>Chunked Upload Button</h3>
        <ChunkedUploadButton/>

        <h3>Upload Drop Zone</h3>
      </ChunkedUploady>
    </main>
  );
}
