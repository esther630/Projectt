import React, { useState } from "react";
import DashboardLayout from "./dashvavigation.jsx";
import {
  Save, Send, Sparkles, AlertTriangle, Info, FileText,
  Plus, Trash2, Bold, Italic, Underline, Undo, Redo,
} from "lucide-react";
import GrammarChecker from "./grammar.jsx";

const categoryLabels = {
  fiction: "Fiction",
  non_fiction: "Non-fiction",
  romance: "Romance",
};

const languageLabels = {
  en: "English",
  tu: "Tumbuka",
  yao: "Yao",
};

export function WriterEditorPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [chapters, setChapters] = useState([
    { id: "1", title: "Chapter 1", content: "" },
  ]);
  const [activeChapter, setActiveChapter] = useState("1");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const activeChapterData = chapters.find((c) => c.id === activeChapter);

  const wordCount =
    activeChapterData?.content.split(/\s+/).filter(Boolean).length || 0;

  const totalWordCount = chapters.reduce(
    (sum, ch) => sum + ch.content.split(/\s+/).filter(Boolean).length,
    0
  );


 


  const handleContentChange = (content) => {
    setChapters((prev) =>
      prev.map((ch) => (ch.id === activeChapter ? { ...ch, content } : ch))
    );
  };

  // Called by GrammarChecker when user clicks Apply
  const handleApplyImprovement = (improvedText) => {
    handleContentChange(improvedText);
  };

  const addChapter = () => {
    const newId = (chapters.length + 1).toString();
    setChapters([
      ...chapters,
      { id: newId, title: `Chapter ${chapters.length + 1}`, content: "" },
    ]);
    setActiveChapter(newId);
  };

  const removeChapter = (id) => {
    if (chapters.length > 1) {
      const newChapters = chapters.filter((ch) => ch.id !== id);
      setChapters(newChapters);
      setActiveChapter(newChapters[0].id);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const [tags, setTags] = useState([]);
const [selectedTags, setSelectedTags] = useState([]);



const saveBook = async (status) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await fetch("http://localhost/project/PHP/save_book.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user.id,
      title,
      category,
      language,
      description: "", // you can connect this to textarea
      chapters,
      tags: selectedTags,
      status, //  important
    }),
  });

  const data = await res.json();
  console.log(data);
};

  return (
    <DashboardLayout type="writer">
      <div className="flex h-[calc(100vh-10rem)] flex-col gap-4 bg-[#FAF8F5]">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
         
          <div className="flex items-center gap-2">
            {lastSaved && (
              <span className="text-sm text-muted-foreground">
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="border px-4 py-2 rounded"
            >
              <Save className="inline mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Draft"}
            </button>
            <button className="border px-4 py-2 rounded"
             onClick={() => saveBook("pending_review")}>
              <Send className="inline mr-2 h-4 w-4" />
              Submit for Review
            </button>
          </div>
        </div>


        {/* Metadata */}
        <div className="flex gap-4">

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{totalWordCount} total words</span>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Chapters */}
          <div className="w-56 border rounded-lg p-2 bg-[#FFFFFF]">
            <div className="flex justify-between">
              <h3>Chapters</h3>
              <button onClick={addChapter}><Plus /></button>
            </div>

            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={`p-2 cursor-pointer ${
                  activeChapter === chapter.id ? "bg-primary/10" : ""
                }`}
                onClick={() => setActiveChapter(chapter.id)}
              >
                <input
                  value={chapter.title}
                  onChange={(e) =>
                    setChapters((prev) =>
                      prev.map((ch) =>
                        ch.id === chapter.id
                          ? { ...ch, title: e.target.value }
                          : ch
                      )
                    )
                  }
                  className="border-0"
                />
                {chapters.length > 1 && (
                  <button onClick={() => removeChapter(chapter.id)}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Editor — single textarea, reads/writes active chapter */}
          <div className="flex-1 flex flex-col border rounded-lg bg-[#FFFFFF]">
            <div className="p-2 border-b flex gap-2">
              <Undo className="h-4 w-4" />
              <Redo className="h-4 w-4" />
              <Bold className="h-4 w-4" />
              <Italic className="h-4 w-4" />
              <Underline className="h-4 w-4" />
            </div>

            <textarea
              className="flex-1 p-4 border-0 outline-none text-lg resize-none"
              placeholder="Start writing your chapter..."
              value={activeChapterData?.content || ""}
              onChange={(e) => handleContentChange(e.target.value)}
            />

            <div className="p-2 text-sm text-muted-foreground border-t">
              {wordCount} words
            </div>
          </div>

          {/* AI Panel — receives current chapter text, writes back on Apply */}
          <GrammarChecker
            text={activeChapterData?.content || ""}
            onApply={handleApplyImprovement}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default WriterEditorPage;
