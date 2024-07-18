# QR-Code-Application
This is a take home assignment that takes an array of strings and returns a QR code that offers customization and that can be downloaded as a SVG file.

## Final Product

### Create QR Code

### Edit QR Code

### Delete QR Code


### Download QR Code

### Error Handling


## Running the application

1. Clone the repository into your directory.
2. In the terminal, `cd` into `QR_Code`. Run `npm install` to install the dependencies, then `npm run dev` to launch the application.

## Approach
Using a GUI (graphic user interface) was my approach. I played around with a sample application to evaluate what kind of user experience I would prefer. I examined and contrasted the layouts of several QR generators. However When I took into consideration that I would be working with many QR codes. I utilized a similar strategy to hold all of our accomplishments at Mottiv because I understand that having everything on the side may not be the best option.Every accomplishment was kept on an individual card at Mottiv, and each card is kept inside a container. I used a similar strategy, omitting the container because I felt that would be the ideal arrangement.

Initially, I considered developing a full-stack application, but given how QR codes operate, I didn't think it was necessary for the user experience. If I were to build a backend and database to store the data, it would be superfluous if the program offered a link to download the QR code, since the same text or URL entered will always produce the same QR code. Though I did consider giving users the option to modify their QR codes, I didn't think it would be as user-friendly if they had to log in and then visit the manage QR code page in order to just look for the previous QR code from a list of x amount of QR codes.

Since using a URL is the most common way to utilize QR codes, I also considered making it URL only. However, after doing some research, I found that many QR code implementations also support plain text. I decided to leave it as any string without restrictions.
## Challenges
Creating and downloading the QR code as a PNG file was simple when I was experimenting and testing the QR Code library. This presented the first difficulty. The difficulty, though, was that I had to convert the existing file to an SVG file.

The customization feature presented me with my second obstacle as I was developing this program. When I first set the input type to colour, the user could choose any colour they desired. But if I went about it that way, the user might choose the primary and secondary colours since they are too similar to each other. As a result, the QR code would not scan. I considered taking the secondary colour out, but I decided that I didn't want to limit the application.

## Future Considerations
Looking ahead, I would like to implement more advanced features, such as bulk downloading, exporting QR codes as different files, or providing different type such as URL, Image, Business Cards like the ones seen on the other QR generator applications which would enhance the user experience.

## Dependencies / Packages
- bootstrap
- bootstrap-icons
- qrcode
- react
- react-bootstrap
- react-dom
- react-router-dom
- react-toastify