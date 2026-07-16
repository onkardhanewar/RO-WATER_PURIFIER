Place your background video file here so the app can serve it at `/bgvide.mp4`.

- Filename required: `bgvide.mp4`
- Location: `client/public/bgvide.mp4`

Notes:
- The `Hero` component will try to load `/bgvide.mp4` first and fall back
  to a CDN video if the file isn't present.
- For best results, use a short, optimized MP4 (H.264) and keep the file size
  reasonable for web delivery.

Example (from project root):

```powershell
copy "C:\path\to\your\bgvide.mp4" "client\\public\\bgvide.mp4"
```
