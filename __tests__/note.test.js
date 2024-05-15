describe('Basic user flow for Website', () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto('https://mosherof.github.io/CSE110-SP24-Lab6-Template/');
    });
  
    // Check to make sure a new note is added everytime the "add-note" button is pressed
    it('Checking notes can be added', async () => {
      console.log('Checking the number of notes added...');
      // Click the + button three times and make sure three notes were created
      const addNote = await page.$("button");
      await addNote.click();
      const firstNote = await page.$$eval("textarea", notes => notes);
      await addNote.click();
      await addNote.click();
      const twoNotes = await page.$$eval("textarea", notes => notes);
      expect(firstNote.length==1 && twoNotes.length==3).toBe(true);
    }, 50000);

     // Checking a note can be deleted
     it('Checking a note can be deleted', async () => {
      console.log('Checking a note can be deleted');

      // Delete a note and check that there is one less note than before
      const firstCount = await page.$$eval("textarea", notes => notes.length);
      const note = await page.$("textarea");
      await note.click({clickCount: 2});
      const secondCount = await page.$$eval("textarea", notes => notes.length);

      expect(firstCount-secondCount).toBe(1);
    }, 50000);

    // Checking a new notes can be written with values stored
    it('Checking new note can be editted', async () => {
        console.log('Checking new note can be editted with values stored...');

        // For each note open, write a message
        const notes = await  page.$$("textarea");
        for (let i=0; i<notes.length; i++) {
          note = notes[i];
          await note.click();
          await page.keyboard.type('I am writing into a new note!');
          await page.keyboard.press('Tab');
        }

        // Gather values
        const newMessages= await page.$$eval("textarea", texts => {
          return texts.map(item => {
            return data = item.value;
          });
        });

       expect(newMessages).toStrictEqual(["I am writing into a new note!", "I am writing into a new note!"]);
      }, 50000);

    // Check to make sure a pre-existing note can be editted and saved
    it('Checking pre-existing note can be editted and saved', async () => {
      console.log('Checking pre-existing note can be editted...');

      // Find the values being stored in each note
      const notes = await page.$$("textarea");
      const notesvals = await page.$$eval("textarea", texts => {
        return texts.map(item => {
          return data = item.value;
        });
      });

      // Rewrite all but one note by deleting letters then adding the new message
      for (let i=0; i<notes.length - 1; i++) {
        note = notes[i]
        const originalMessage = notesvals[i];
        await note.click();
        for (let i = 0; i < originalMessage.length; i++) {
          await page.keyboard.press('Backspace');
        }
        await page.keyboard.type("I am changing this note. My next tests will reload the page to check if elements are still present, then try to delete a current saved note.");
      }
      await page.keyboard.press('Tab');
    
      // Find new values of messages
      const newMessages = await page.$$eval("textarea", text => {
        return text.map(item => {
          return data = item.value;
        });
      });

      expect(newMessages).toStrictEqual(["I am changing this note. My next tests will reload the page to check if elements are still present, then try to delete a current saved note.", "I am writing into a new note!"]);
    }, 50000);


    // Check to make sure content stays after reloading page
    it('Checking reloading content does not change page', async () => {
      console.log('Checking reloading content does not change page');

      // Record what the notes are before refreshing
      const notes = await page.$$eval("textarea", note => {
        return note.map(item => {
          return data = item.value;
        });
      });
      await page.reload();

      // Record the notes after refreshing
      const newNotes = await page.$$eval("textarea",  note => {
        return note.map(item => {
          return data = item.value;
        });
      });

      expect(notes).toStrictEqual(newNotes);

    }, 50000);

    // Check to make sure saved notes can be deleted
    it('Checking saved notes can be deleted', async () => {
      console.log('Checking saved notes can be deleted');
      const firstCount = await page.$$eval("textarea", notes => notes.length);
      const note = await page.$("textarea");
      await note.click({clickCount: 2});
      const secondCount = await page.$$eval("textarea", notes => notes.length);

      expect(firstCount-secondCount).toBe(1);
    }, 50000);
  });
  