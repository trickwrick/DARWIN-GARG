"use client";

import type { EssayBlock } from "@/data/essays";
import styles from "@/app/admin/admin.module.css";

type EssayBlocksEditorProps = {
  blocks: EssayBlock[];
  onChange: (blocks: EssayBlock[]) => void;
};

export default function EssayBlocksEditor({
  blocks,
  onChange,
}: EssayBlocksEditorProps) {
  const updateBlock = (index: number, block: EssayBlock) => {
    onChange(blocks.map((item, i) => (i === index ? block : item)));
  };

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const addBlock = (type: EssayBlock["type"]) => {
    switch (type) {
      case "paragraph":
        onChange([...blocks, { type: "paragraph", text: "" }]);
        break;
      case "heading":
        onChange([...blocks, { type: "heading", text: "" }]);
        break;
      case "quote":
        onChange([...blocks, { type: "quote", text: "" }]);
        break;
      case "list":
        onChange([...blocks, { type: "list", items: [""] }]);
        break;
    }
  };

  return (
    <div>
      <div className={styles.repeatableList}>
        {blocks.map((block, index) => (
          <div key={index} className={styles.nestedItem}>
            <div className={styles.repeatableHeader}>
              <span className={styles.nestedLabel}>
                Block {index + 1}: {block.type}
              </span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeBlock(index)}
              >
                Remove
              </button>
            </div>

            {block.type === "paragraph" || block.type === "heading" ? (
              <textarea
                className={styles.textarea}
                rows={block.type === "heading" ? 2 : 4}
                value={block.text}
                onChange={(e) =>
                  updateBlock(index, { ...block, text: e.target.value })
                }
              />
            ) : null}

            {block.type === "quote" ? (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quote</label>
                  <textarea
                    className={styles.textarea}
                    rows={3}
                    value={block.text}
                    onChange={(e) =>
                      updateBlock(index, { ...block, text: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Attribution (optional)</label>
                  <input
                    className={styles.input}
                    value={block.attribution ?? ""}
                    onChange={(e) =>
                      updateBlock(index, {
                        ...block,
                        attribution: e.target.value,
                      })
                    }
                  />
                </div>
              </>
            ) : null}

            {block.type === "list" ? (
              <div className={styles.formGroup}>
                <label className={styles.label}>List items (one per line)</label>
                <textarea
                  className={styles.textarea}
                  rows={5}
                  value={block.items.join("\n")}
                  onChange={(e) =>
                    updateBlock(index, {
                      type: "list",
                      items: e.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className={styles.blockActions}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => addBlock("paragraph")}
        >
          + Paragraph
        </button>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => addBlock("heading")}
        >
          + Heading
        </button>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => addBlock("quote")}
        >
          + Quote
        </button>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => addBlock("list")}
        >
          + List
        </button>
      </div>
    </div>
  );
}
