# Small Changes Left to Make

This is a collection of all the things that are left to change. Just 
small stuff (e.g. some style modifications on different vieports).

* Change the images 2 and 3 ("AR One" and "Group Shot") to smaller 
versions on mobile (no need to download 2800px on mobile)

* Image Slider: When aspect ratio of image matches the aspect 
ratio of the screen to a certain degree the three control 
buttons overlap with the image card

* Redirect routes like "/gallery/1/ed" or "/gallery/ed" to dedicated 
404 page

* Button on articles

* Spinner inside modal delete-dialog (article, image, contact)

* Make Spinners alway spin for at least 0.5 seconds (arbitrary amount)
so that the user get some feedback (even though the server might only 
take sub 0.1 seconds for the request)

* Improve Material UI Imports (import directly from ".../core/Button"
instead of ".../core")

* Maybe build my own datepicker or just a select-drop-down. Currently 
the material datepicker makes up 7.3% of the total bundle size. And in
addition to that "date-fns" makes up 7.2%. So i could definitely save 
a lot here (95KB uncrompresses JS).


