I made some changes to get this deployed on my website (Hostinger)
After I ran the npm run build I added "/weather-app" to the paths for my Favicon, Js and CSS files inside the index.html.

I also had to change the code in my main.jsx to match the subdirectory in Hostinger (arronreed.com/weather-app)

const router = createBrowserRouter(
[
{
path: "/",
element: (
<div className="body">
<App />
</div>
),
},
],
{
basename: "/weather-app", // Add this line
}
);
