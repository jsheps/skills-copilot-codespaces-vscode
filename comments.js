// Create web server and listen to port 3000
const express = require('express')
const app = express()
const port = 3000

// Set up the template engine
app.set('view engine', 'ejs')

// Set up the static files
app.use(express.static('public'))

// Set up body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// Set up mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true })

// Set up schema
const commentSchema = new mongoose.Schema({
  name: String,
  content: String
})

// Create model
const Comment = mongoose.model('Comment', commentSchema)

// Set up routes
app.get('/', (req, res) => {
  res.render('home')
})

app.post('/create', (req, res) => {
  Comment.create({
    name: req.body.name,
    content: req.body.content
  }, (err, comment) => {
    if (err) return console.error(err)
    res.redirect('/comments')
  })
})

app.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    if (err) return console.error(err)
    res.render('comments', { comments: comments })
  })
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})
```

## 3. Create views
Create `home.ejs` and `comments.ejs` in the `views` folder.

### home.ejs
```html
<!-- File: views/home.ejs -->
<h1>Comments</h1>
<form action="/create" method="POST">
  <input type="text" name="name" placeholder="Name">
  <textarea name="content" rows="5" cols="40" placeholder="Comment"></textarea>
  <input type="submit" value="Submit">
</form>
```

### comments.ejs
```html
<!-- File: views/comments.ejs -->
<h1>Comments</h1>
<% comments.forEach((comment) => { %>
  <div>
    <h3><%= comment.name %></h3>
    <p><%= comment.content %></p>
  </div>
<% }) %>
```

## 4. Run the app
Run the app with


