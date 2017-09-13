# add a remote:
$ git remote add origin https://github.com/user/repo.git

# display remotes
$ git remote show origin


github.com/designcourse/mean4plus



$ ng serve --prod --watch

$ npm i -g nodemon
$ nodemon app.js # rs   to restart

$ npm i nodemailer


@ViewChild @Input @Output

child routes


app folders: actions, reducers, constants, routes
express folders: routes


------------------------------------- git stash

# GIT STASH


# stash some changes
$ git stash save -u "msg"  # the -u keeps untracked files! awesome! (same as --include-untracked)

# now you should have a clean state


# reapply saved stash
git stash apply stash@{0}


# now drop the stash (it is NOT automatically deleted)
$ git stash drop stash@{0}


$ git stash list  # see all entries



# it seems you cant see the untracked files content 
# (but dont worry, you will be able to restore them!)

$ git stash show stash@{0}
