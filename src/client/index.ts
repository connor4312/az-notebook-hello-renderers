/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

const notebookApi = acquireNotebookRendererApi("az-notebook-hello-renderers");

notebookApi.onDidCreateOutput((evt) => {
  const output: {
    title: string;
    url: string;
  } = evt.output.data[evt.mimeType];

  debugger;

  const title = document.createElement('h1');
  title.innerText = output.title;
  evt.element.appendChild(title);

  const img = document.createElement('img');
  img.src = output.url;
  evt.element.appendChild(img);
});
