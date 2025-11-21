import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const MentorFeedback: React.FC = () => {
  const [selectedLearner, setSelectedLearner] = useState(1);
  const [feedbackText, setFeedbackText] = useState("");

  const learners = [
    { id: 1, name: "Alice Johnson", lastSession: "2025-11-15" },
    { id: 2, name: "Bob Smith", lastSession: "2025-11-14" },
    { id: 3, name: "Carol White", lastSession: "2025-11-15" },
  ];

  const feedbackList = [
    { id: 1, learnerName: "Alice Johnson", date: "2025-11-14", text: "Great progress on pronunciation. Keep practicing the 'th' sounds!" },
    { id: 2, learnerName: "Bob Smith", date: "2025-11-13", text: "You need to work on sentence structure. Let's focus on that next session." },
    { id: 3, learnerName: "Carol White", date: "2025-11-15", text: "Excellent work! You're advancing quickly. Ready for advanced level." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Give Feedback</h1>
        <p className="text-muted-foreground mt-2">Provide constructive feedback to your learners</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learners List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Learners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {learners.map((learner) => (
              <button
                key={learner.id}
                onClick={() => setSelectedLearner(learner.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedLearner === learner.id
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-muted border-muted"
                }`}
              >
                <p className="font-semibold">{learner.name}</p>
                <p className="text-xs text-muted-foreground">Last session: {learner.lastSession}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Feedback Form */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Write Feedback</CardTitle>
              <CardDescription>
                Selected: {learners.find((l) => l.id === selectedLearner)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Feedback Type</label>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="cursor-pointer">
                    Positive
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Constructive
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    General
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Feedback Message</label>
                <Textarea
                  placeholder="Write your feedback here..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="mt-2 min-h-[150px]"
                />
              </div>

              <Button className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Feedback
              </Button>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback Given</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbackList.map((fb) => (
                <div key={fb.id} className="p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{fb.learnerName}</h4>
                    <p className="text-xs text-muted-foreground">{fb.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{fb.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorFeedback;
