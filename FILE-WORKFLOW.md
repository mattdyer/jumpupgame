 Based on my instructions in AGENTS.md, when I need to work with large files, I follow a Granular Incremental Workflow to prevent
 timeouts or errors caused by losing track of the file structure.

 The workflow consists of these steps:

 1. Avoid Large Writes: I never attempt to write the entire content of a large file in a single operation.
 2. Small, Targeted Insertions: I use insert_code to add small chunks of code (ideally 20-30 lines at most) into the file.
 3. Continuous Verification: After every insertion, I immediately read the file to:
     - Confirm the content was inserted correctly.
     - Verify that the line numbers are still accurate (ensuring no "drift" occurred).
 4. Error Recovery: If an insertion is incorrect or a mistake was made:
     - I use delete_lines to remove the error.
     - I read the file again to re-establish a correct understanding of the current state.
     - I rethink how to break up the next insertion and try again.

 This "Insert $\rightarrow$ Read $\rightarrow$ Verify" loop ensures that even as the file grows, my mental model of the code remains
 perfectly synchronized with the actual file on disk.