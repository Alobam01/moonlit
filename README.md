# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Next.js
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase
- ImageKit.io

## Environment Setup

### ImageKit.io Configuration

This project uses ImageKit.io for image uploads. To set up ImageKit:

1. **Create an ImageKit account** at [https://imagekit.io](https://imagekit.io)
2. **Get your credentials** from the ImageKit dashboard:
   - Public Key
   - Private Key
   - URL Endpoint

3. **Create a `.env.local` file** in the root directory with the following variables:

```env
IMAGEKIT_PUBLIC_KEY=your_public_key_here
IMAGEKIT_PRIVATE_KEY=your_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

4. **Restart your development server** after adding the environment variables.

### Supabase Configuration

This project also uses Supabase for the database. Make sure to set up your Supabase credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## ImageKit Usage

The project includes reusable utilities for ImageKit uploads:

- **Utility functions**: `src/lib/imagekit-upload.ts`
- **React hook**: `src/hooks/use-imagekit-upload.ts`

### Example Usage

```tsx
import { useImageKitUpload } from "@/hooks/use-imagekit-upload";

function MyComponent() {
  const { uploadImage, isUploading, error } = useImageKitUpload({
    folder: "/kittens",
    useUniqueFileName: true,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        console.log("Uploaded image URL:", url);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      disabled={isUploading}
    />
  );
}
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
