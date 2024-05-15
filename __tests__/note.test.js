describe('Basic user flow for Website', () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto('https://mosherof.github.io/CSE110-SP24-Lab6-Template/');
    });
  
    // Check to make sure a new note is added everytime the "add-note" button is pressed
    it('Checking notes can be added', async () => {
      console.log('Checking the number of notes added...');
      const addNote = await page.$("button");
      await addNote.click();
      const firstNote = await page.$$eval("textarea", notes => notes);
      await addNote.click();
      const twoNotes = await page.$$eval("textarea", notes => notes);
      expect(firstNote.length==1 && twoNotes.length==2).toBe(true);
    }, 50000);

     // Checking a note can be deleted
     it('Checking a note can be deleted', async () => {
      console.log('Checking a note can be deleted');
      // first add a note (so you know there is a note to be deleted)
      const addNote = await page.$("button");
      await addNote.click();
      const firstCount = await page.$$eval("textarea", notes => notes.length);

      // delete a note
      const note = await page.$("textarea");
      await note.click({clickCount: 2});
      const secondCount = await page.$$eval("textarea", notes => notes.length);

      expect(firstCount-secondCount).toBe(1);
    }, 50000);

    // Checking a new notes can be written after being saved
    it('Checking new note can be editted', async () => {
        console.log('Checking new note can be editted');
        const notes = await  page.$$("textarea");
        for (let i=0; i<notes.length; i++) {
          note = notes[i];
          await note.click();
          await page.keyboard.type('I am writing into a new note!');
          await page.keyboard.press('Tab');
        }

        const newMessages= await page.$$eval("textarea", texts => {
          return texts.map(item => {
            return data = item.innerHTML;
          });
        });

       expect(newMessages).toBe(['I am writing into a new note!'] * newMessages.length);
      }, 50000);

    // Check to make sure a pre-existing note can be editted and saved
    it('Checking pre-existing note can be editted and saved', async () => {
      console.log('Checking pre-existing note can be editted...');
      const notes = await page.$("textarea");
      const originalMessage = 'I am writing into a new note!'; //await page.$eval("textarea", text => text.innerHTML);
      await note.click();
      for (let i = 0; i < originalMessage.length; i++) {
        await page.keyboard.press('Backspace');
      }
      await page.keyboard.type('I am changing this note');
      const newMessage = await page.$eval("textarea", text => text.innerHTML);
      await page.keyboard.press('Tab');
      expect(newMessage).toBe('I am changing this note');
    }, 50000);


    // Check to make sure content stays after reloading page
    it('Checking reloading content does not change page', async () => {
      console.log('Checking reloading content does not change page');
      const notes = await page.$$eval("textarea", note => {
        return note.map(item => {
          return data = item.innerHTML;
        });
      });
      await page.reload();
      let newNotes = [];
      try {
        newNotes = await page.$eval("textarea",  note => {
          return note.map(item => {
            return data = item.innerHTML;
          });
        });
      }
      catch(err) {
        newNotes = []
      }
      expect(notes).toBe(newNotes);

    }, 50000);



  });
  