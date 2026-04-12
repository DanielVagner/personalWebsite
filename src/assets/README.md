# Project Assets

## Project Images Setup

This folder should contain your project screenshot images. Currently, the application uses placeholder images from Unsplash.

### Required Images:

1. **hudba-na-vinicich.png** - Hudba na vinicích app screenshot
2. **tolion.png** - Tolion Brain Health Coach app screenshot  
3. **tpodlahy.png** - TPodlahy.cz website screenshot
4. **qr-ticket.png** - QR Ticketing System app screenshot
5. **findtastic-1.png** - Findtastic app screenshot 1 (left side)
6. **findtastic-2.png** - Findtastic app screenshot 2 (right side)
7. **mdas.png** - MDAS Mobile Data Acquisition System screenshot

### How to add your images:

1. Save your project screenshots to this `/src/assets/` folder with the exact filenames listed above
2. Open `/src/app/components/Projects.tsx`
3. Comment out the placeholder image URLs (lines 7-13)
4. Uncomment the import statements (lines 16-22)
5. Save the file

The application will now use your local images instead of the Unsplash placeholders.

### Image Recommendations:

- Format: PNG or JPG
- Recommended width: 1080px or higher
- Aspect ratio: 16:9 or similar for best display
- Optimize images for web to reduce file size
