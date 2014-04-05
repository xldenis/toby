#!/usr/bin/python

# Import modules for CGI handling 
import cgi, cgitb 

# Create instance of FieldStorage 
form = cgi.FieldStorage() 

# Get data from fields
surveyTitle = form.getvalue('survey_title')
question  = form.getvalue('question')

ssvFile =  open(survey.ssv, "w")

ssvFile.write(surveyTitle) 

ssvFile.close()