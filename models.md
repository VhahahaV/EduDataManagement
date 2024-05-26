# 数据模型示例

### student

```
{
  "studentId": null,
  "passwd": "securepassword20",
  "name": "xiaoming",
  "id": 1
}
```

### teacher

```
{
  "passwd": "password123",
  "name": "John Doe",
  "id": 1
}
```

### announcement

```
{
  "id": 1,
  "time": "today",
  "title": "New Announcement",
  "content": "new announcement",
  "username": "admin"
}
```

### course_review

```
{
  "id": 1,
  "title": "Great Course",
  "content": "The course material was very thorough"
}
```

### class_course_detail

```
{
  "classFrame": "[\"Limits\", \"Continuity\", \"Derivatives\", \"Integrals\"]",
  "preKnowledge": "Basic calculus knowledge.",
  "classAim": "Understand advanced mathematics.",
  "courseReviews": [
      {
          "id": 1,
          "title": "Great Course",
          "content": "The course material was very thorough"
      }
  ],
  "className": "Advanced Mathematics",
  "classNum": 40,
  "classIntro": "Study of advanced mathematical concepts.",
  "classTime": "2024-05-01 to 2025-05-01",
  "sections": "{\"section1\": [\"Limits\", \"Continuity\"], \"section2\": [\"Derivatives\", \"Applications\"], \"section3\": [\"Integrals\"]}",
  "classDescription": "Covers calculus and series.",
  "homeworkNum": 10,
  "id": 2,
  "classTimeDetail": "Mon & Wed, 10:00-11:30 AM"
}
```

### course

```
{
  "teachers": [
      {
          "passwd": "securepassword3",
          "name": "Michael Brown",
          "id": 3
      },
      {
          "passwd": "securepassword4",
          "name": "Emily Davis",
          "id": 4
      },
      {
          "passwd": "password123",
          "name": "John Doe",
          "id": 1
      },
      {
          "passwd": "securepassword2",
          "name": "Jane Smith",
          "id": 2
      }
  ],
  "students": [],
  "className": "Advanced Mathematics",
  "id": 1,
  "classCourseDetail": {
      "classFrame": "[\"Limits\", \"Continuity\", \"Derivatives\", \"Integrals\"]",
      "preKnowledge": "Basic calculus knowledge.",
      "classAim": "Understand advanced mathematics.",
      "courseReviews": [
          {
              "id": 1,
              "title": "Great Course",
              "content": "The course material was very thorough"
          }
      ],
      "className": "Advanced Mathematics",
      "classNum": 40,
      "classIntro": "Study of advanced mathematical concepts.",
      "classTime": "2024-05-01 to 2025-05-01",
      "sections": "{\"section1\": [\"Limits\", \"Continuity\"], \"section2\": [\"Derivatives\", \"Applications\"], \"section3\": [\"Integrals\"]}",
      "classDescription": "Covers calculus and series.",
      "homeworkNum": 10,
                "id": 2,
      "classTimeDetail": "Mon & Wed, 10:00-11:30 AM"
  },
  "classTime": "2024-12-01 to 2025-06-01"
}
```

### courseTeacher

```
{
  "teacher": 1,
  "course": 1,
  "id": 1
}
```

### student_course_data

```
{
  "process": "75%",
  "chapters": "[{\"title\": \"Limits\", \"completed\": true}, {\"title\": \"Continuity\", \"completed\": true}, {\"title\": \"Derivatives\", \"completed\": false}]",
  "student": {
      "studentId": null,
      "passwd": "securepassword20",
      "name": "xiaoming",
      "id": 1
  },
  "gradeAnalysis": "{\"excellent\": 10, \"good\": 15, \"average\": 5, \"poor\": 0}",
  "finishClassNum": 30,
  "homeworkTotal": 10,
  "homeworkSubmitted": 8,
  "feedback": "This course is very informative and engaging.",
  "score": 85,
  "course": {
      "teachers": [
          {
              "passwd": "securepassword3",
              "name": "Michael Brown",
              "id": 3
          },
          {
              "passwd": "securepassword4",
              "name": "Emily Davis",
              "id": 4
          },
          {
              "passwd": "password123",
              "name": "John Doe",
              "id": 1
          },
          {
              "passwd": "securepassword2",
              "name": "Jane Smith",
              "id": 2
          }
      ],
      "students": [],
      "className": "Advanced Mathematics",
      "id": 1,
      "classCourseDetail": {
          "classFrame": "[\"Limits\", \"Continuity\", \"Derivatives\", \"Integrals\"]",
          "preKnowledge": "Basic calculus knowledge.",
          "classAim": "Understand advanced mathematics.",
          "courseReviews": [
              {
                  "id": 1,
                  "title": "Great Course",
                  "content": "The course material was very thorough"
              }
          ],
          "className": "Advanced Mathematics",
          "classNum": 40,
          "classIntro": "Study of advanced mathematical concepts.",
          "classTime": "2024-05-01 to 2025-05-01",
          "sections": "{\"section1\": [\"Limits\", \"Continuity\"], \"section2\": [\"Derivatives\", \"Applications\"], \"section3\": [\"Integrals\"]}",
          "classDescription": "Covers calculus and series.",
          "homeworkNum": 10,
          "id": 2,
          "classTimeDetail": "Mon & Wed, 10:00-11:30 AM"
      },
      "classTime": "2024-12-01 to 2025-06-01"
  },
  "studyDuration": "30 hours",
  "id": 1,
  "attendance": 20
}
```
