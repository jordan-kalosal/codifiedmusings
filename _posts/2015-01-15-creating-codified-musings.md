---
layout: post
title: Creating Codified Musings
categories: leadership
pretty_categories: Leadership
include_image: true
image: jekyll.png

excerpt: How I migrated Codified Musings from Wordpress to Jekyll in a day, and why I couldn't be happier with the decision.
meta_description: How codifiedmusings was created with the Jekyll static site generator
meta_keywords: webdev, jekyll
---

Creating Codified Musings
===================
*Code Download: <a href="https://github.com/jordan-kalosal/codifiedmusings">https://github.com/jordan-kalosal/codifiedmusings</a>*

Though Codified Musings was first created nearly a year ago, I spent the last few months procrastinating a redesign and putting off creating new content.  Perhaps I was actually busy or perhaps I fell into the "I'll start a blog and then never tough it after a month trap", but having the opportunity to learn a new tool (<a href="jekyllrb.com">Jekyll</a>) and redesign the site has brought new purpose to this rhetorical hobby.

### Why Jekyll
*(Skip this if you just want to learn how to use Jekyll)*

Let's jump right into it.  Wordpress was proving much to cumbersome for my simple little blog.  Keeping all of the themes and plugins up to date was a hassle.  Having to break out the PHP books every time I wanted to make a substantial change quickly turned a new post into a weekend project.  It simply wasn't working.  Because of its impracticality, the mere thought of spending any time learning any PHP still leaves me a little queasy.

In comes Jekyll - a static site generator.  This means you don't need any fancy webserver to host the site or database service (like MySQL) hogging resources on your server.  Instead, I just compile the site with Jekyll, upload it to a folder on my webserver and point my url at it (I feel like I'm 12 and making that first website again).  Serving a static site significantly reduced server load and (in my case) made it much easier to update the site.  I just make a change, recompile then upload the static HTML/javascript and asset files to the server.  When I first uploaded it, the <i>entire site</i> clocked in at just under 1MB.  Goodbye to all that Wordpress and MySQL bloat!

I love being able to write my posts in markdown (which is then compiled into HTML by Jekyll).  Though I no longer have the feature-rich WYSIWYG Wordpress editor, I do get pretty syntax highlighting which was quite the pain to implement in Wordpress (and pretty much the only special formatting I use).

## How Jekyll Really Works
Let me start by saying that my explanation here will be intentionally brief and no match for the <a href="http://jekyllrb.com/docs/home/">official Jekyll documentation</a>.  However, to really explain how Codified Musings was created, a cursory understanding of Jekyll is in order.

Jekyll takes posts (in the /_posts/ folder) and pages (markdown or html files in the root folder), pops them into pre-defined HTML layouts (in /_layouts/) and ultimately generates an entire static site.  That is, every page or post in the site is generated as a unqiue html page that can be accessed on a webserver. 

The <a href="https://github.com/Shopify/liquid/wiki">Liquid Templating System</a> is used to power Jekyll templates.  This allows us to display unique information such as a page's title or the date a post was published.  More complex logic, such as if statements and for loops are also available in templates.  For example, my home page (index.html) uses a for loop to display recent posts.  Check out the <a href="http://jekyllrb.com/docs/templates/">Jekyll templating documentation</a> for a crash course on how to use variables and logic in templates.

In short, here's how I created Codified Musings as you see it today:

## 1) Bring in the Posts
The 5 (wow that's a bit embarrasing) posts from the old Wordpress Codified Musings needed to migrate their way over to the new Jekyll site.  Doing this wasn't hard.  Because there were so few posts, I literally copied & pasted from the Wordpress editor into new markdown files.  The result was almost perfect!  I needed only add some <a href="http://daringfireball.net/projects/markdown/syntax#em">special markdown</a> for headings and the like.

It's important to name posts correctly.  The date is emedded in the posts' file name so my "Hello World" post from March 1, 2014 becomes: <i>2014-03-01-hello-world.md</i> in the /_posts/ folder.

### 2) Bring in the Pages
In addition to the posts, there were three pages that existed on the old Worpress site: a resources page, contact page and about page.  To create pages in Jekyll, I just needed to create an HTML or markdown file in the site's root folder.  I went ahead and created "contact.html", "resources.html" and "about.html".  For the about page, I was simply able to copy over the content from the Wordpress site.  The contact page uses <a href="https://getsimpleform.com/">Simple Form</a> to house a contact form that sends me an email when filled out.  Note that there is a specific "contact_complete.html" page that users are redirected to after completing the contact form.  The resources page has yet to be implemented (the easiest way, by far, to create a web page is to not create it).

The awesome thing about creating HTML pages like this is what you create is exactly what will appear in the final site.  Don't go too crazy though; it would be poor practice to write <i>all</i> the HTML for <i>each and every page</i>.  Instead, Jekyll provides two tools for reusing code: Includes and Layouts.

### 3) Don't Exclude the Includes
Includes are reusable chunks of code (html/css/javascript) that will be used throughout the site for different types of content (say pages <i>and</i> posts).  These are like web gems (if you're a Ruby person) or modules (if you hail from Python-land).  I created three includes for Codified Musings:

#### Head (/_includes/head.html)
<div class="indent">
This file contains all the goodies that go in the head tag including external javascript/css, analytics code, title, etc.  Notice that there is some conditional logic for the page title (leveraging the Liquid templating engine).
</div>

#### Site Mast (/_includes/mast.html)
<div class="indent">
mast.html contains what you see as the header (or, as I call it - the mast - because I'm fancy) of this site.  This includes some cool <a href="http://getbootstrap.com/">bootstrap</a> logic (through css classes) to make the blog responsive.  This file also includes my Twitter widget.</div>

#### Categories Banner (/_includes/categories-banner.html)
<div class="indent">The categories banner (which has links to the three categories of posts) was created as an Include because I wasn't sure if it would be used on all pages.  That is, I wanted to <i>include</i> it on certain pages and exclude it on others.  Since many pages may use the same layout, I put this banner in an Include (and then proceeded to use it on every page).  Note that this banner also has some handy bootstrap logic to make it responsive.</div>

### 3) Lay it Out
Jekyll has these cool layouts, that determine the...er...layout of each page or post.  Layouts can inherit from other layouts.  For example, with Codified Musings, I have a default layout with three others that inherit from it:

#### Default (/_layouts/default.html)
<div class="indent">All other layouts inherit from default.  Default is really sort of a shell for the entire site.  It uses the mast and head includes. At the bottom is an HTML footer.  Sandwiched between these is a single variable: {% raw %}{{ content }}{% endraw %} which loads all of the content for any page that uses this layout (which is every page).</div>

#### Page (/_layouts/page.html)
<div class="indent">This layout is used for pages (as oppose to posts) on the site such as the resources and contact page.  The only real thing that the page layout adds is a title (again, optimized with bootstrap).</div>

#### Category (/_layouts/category.html)
<div class="indent">The Category layout is used solely on the three pages that display categories of posts: economics.html, webdev.html and leadership.html.  The next section discusses these sections in a bit more detail.</div>

#### Post (/_layouts/post.html)
<div class="indent">Finally, the most used layout is the Post layout.  This layout is applied to all posts (including the one you're reading now).  The Post layout includes a title and date.  It also includes the social sharing links you'll find at the bottom of this page, coupled with a short listing of related posts.  Both of these elements proved pretty simple to create: pretty much every social media site allows for links to share content and the related posts are simply the 3 most recent posts in the same category as the one being displayed.</div>

### 4) Special Categories
Because I can't easily make concrete decisions, I decided that this blog would have three categories of posts: leadership, economics and web development.  To lessen the confusion of my audience, I wanted to implemented individual pages that listed posts for each of the three categories.  In Wordpress this would have been accomplished by creating a categories.php template.  In Jekyll, it was almost as easy.  I had to create an individual page for each category, but was able to use the same <i>layout</i> for each page.

You guessed it, this was the category.html layout.  I could have just as easily used the page layout; the only difference in the category layout is that the content takes up the whole screen on large devices.  The real magic for these special category pages is in the template logic that displays posts.  Take a look at this snippet from economics.html:
{% raw %}
{% for post in site.posts %} 
{% if post.categories contains 'economics' %}
{% endraw %}

This loops through all of the posts - just like on the home (index.html) page - except that only thoses posts with category 'economics' are displayed.  Other than that, the layout is exactly like the home page.

### Wrapping Up
And that's all folks.  I started crafting this blog with Jekyll about a month ago and have no intention of turning back.  Jekyll is simple - I've used just about all of the features already.  But I like it that way.  I'm free to create content as I see fit, have full control over how my ideas are conveyed to a reader and don't have to worry about complex backend development or configuration.  If you get a chance, give <a href="http://jekyllrb.com/">Jekyll</a> a shot.  Feel free to <a href="/contact.html">contact me</a> if you need any help!
