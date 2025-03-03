export function extractFirstImage(htmlContent: string) {
    try {
      // Create a temporary DOM element to parse the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      // Find the first image in the content
      const firstImg = tempDiv.querySelector("img");

      if (firstImg) {
        // Get the src attribute (base64 or URL)
        return firstImg.src;
      }

      // Return a default image if no image found
      return "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*3XS-8r8adjnRoNH4YjKXpw.png";
    } catch (error) {
      console.error("Error extracting image:", error);
      return "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*3XS-8r8adjnRoNH4YjKXpw.png";
    }
  }