// tina/config.ts
import { defineConfig } from "tinacms";

// tina/templates.ts
function postFields() {
  return [
    {
      type: "string",
      name: "author",
      label: "Author",
      ui: {
        component: "textarea"
      },
      required: true
    },
    {
      type: "datetime",
      name: "date",
      label: "Date"
    },
    {
      type: "image",
      name: "hero_image",
      label: "Hero Image"
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "tag",
      label: "Tag",
      list: true,
      ui: {
        component: "tags"
      }
    }
  ];
}
function videoFields() {
  return [
    {
      type: "datetime",
      name: "date",
      label: "date"
    },
    {
      type: "string",
      name: "author",
      label: "author"
    },
    {
      type: "image",
      name: "hero_image",
      label: "hero_image"
    },
    {
      type: "string",
      name: "title",
      label: "title"
    },
    {
      type: "string",
      name: "description",
      label: "description"
    },
    {
      type: "string",
      name: "youtube_id",
      label: "Youtube ID"
    },
    {
      type: "string",
      name: "tag",
      label: "Tag",
      list: true,
      ui: {
        component: "tags"
      }
    }
  ];
}

// tina/config.ts
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var tinaClientId = process.env.NEXT_TINACMS_CLIENT_ID;
var tinaToken = process.env.NEXT_TINACMS_TOKEN;
var config_default = defineConfig({
  branch,
  clientId: tinaClientId,
  // Get this from tina.io
  token: tinaToken,
  // Get this from tina.io
  client: { skip: false },
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        format: "md",
        label: "Videos",
        name: "videos",
        path: "videos",
        match: {
          include: "**/*"
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true
          },
          ...videoFields()
        ]
      },
      {
        format: "md",
        label: "Posts",
        name: "posts",
        path: "posts",
        match: {
          include: "**/*"
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true
          },
          ...postFields()
        ]
      }
    ]
  }
});
export {
  config_default as default
};
