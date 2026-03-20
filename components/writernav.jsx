import React, { useState } from "react";

import {
  Save,
  Send,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Plus,
  Trash2,
  GripVertical,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react";

// Types removed for JSX compatibility

const categoryLabels = {
  fiction: "Fiction",
  non_fiction: "Non-fiction",
};

const languageLabels = {
  en: "English",
};

const mockSuggestions = [
  {
    id: "1",
    type: "grammar",
    message: "Subject-verb agreement",
    original: "The children was playing",
    suggestion: "The children were playing",
  },
];

const getSuggestionIcon = (type) => {
  switch (type) {
    case "grammar":
      return <AlertTriangle className="h-4 w-4 text-amber-600" />;
    case "spelling":
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case "style":
      return <Sparkles className="h-4 w-4 text-blue-600" />;
    case "clarity":
      return <Info className="h-4 w-4 text-primary" />;
    default:
      return null;
  }
};

const getSuggestionColor = (type) => {
  switch (type) {
    case "grammar":
      return "border-amber-200 bg-amber-50";
    case "spelling":
      return "border-red-200 bg-red-50";
    case "style":
      return "border-blue-200 bg-blue-50";
    case "clarity":
      return "border-primary/20 bg-primary/5";
    default:
      return "";
  }
};

export function WriterEditorPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [chapters, setChapters] = useState([
    { id: "1", title: "Chapter 1", content: "" },
  ]);
  const [activeChapter, setActiveChapter] = useState("1");
  const [suggestions, setSuggestions] = useState(mockSuggestions);
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
      prev.map((ch) =>
        ch.id === activeChapter ? { ...ch, content } : ch
      )
    );
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

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 ">
      {/* Header */}
    
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          placeholder="Enter your story title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-0 bg-transparent text-2xl font-serif font-bold placeholder:text-muted-foreground/50 focus-visible:ring-0"
        />

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

          <button className="border px-4 py-2 rounded">
            <Send className="inline mr-2 h-4 w-4" />
            Submit for Review
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Category</option>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Language</option>
          {Object.entries(languageLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>{totalWordCount} total words</span>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Chapters */}
        <div className="w-56 border rounded-lg p-2">
          <div className="flex justify-between">
            <h3>Chapters</h3>
            <button onClick={addChapter}>
              <Plus />
            </button>
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

        {/* Editor */}
        <div className="flex-1 flex flex-col border rounded-lg">
          <div className="p-2 border-b flex gap-2">
            <Undo className="h-4 w-4" />
            <Redo className="h-4 w-4" />
            <Bold className="h-4 w-4" />
            <Italic className="h-4 w-4" />
            <Underline className="h-4 w-4" />
          </div>

          <textarea
            value={activeChapterData?.content || ""}
            onChange={(e) => handleContentChange(e.target.value)}
            className="flex-1 p-4 border-0 outline-none text-lg"
          />

          <div className="p-2 text-sm text-muted-foreground border-t">
            {wordCount} words
          </div>
        </div>

        {/* AI Panel */}
        <div className="w-72 border rounded-lg p-4">
          <h3 className="flex items-center gap-2">
            <Sparkles /> AI Assistant
          </h3>

          {suggestions.map((s) => (
            <div key={s.id} className={`p-3 mt-2 border rounded ${getSuggestionColor(s.type)}`}>
              <div className="flex gap-2 items-center">
                {getSuggestionIcon(s.type)}
                <span>{s.type}</span>
              </div>

              <p className="text-sm">{s.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WriterEditorPage;