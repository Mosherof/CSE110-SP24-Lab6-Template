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
        notes = await  page.$$("textarea");
        for (let i = 0; i < notes.length; i++) {
          const note = notes[i];
          await note.click();
          await page.keyboard.type('I am writing into a new note!', {delay: 30});
        }
        //await notes[0].click();

        const messages = page.$$eval("textarea", notes => notes);


       expect(messages).toBe("20");
      }, 50000);

    // Checking an existing note can be editted after being saved
    it('Checking existing note can be editted', async () => {
        console.log('Checking existing note can be editted');
        //expect(count).toBe("20");
      }, 50000);

    // Checking that notes are saved even after refreshing the page
    it('Checking notes are saved even after refreshing the page', async () => {
        console.log('Checking notes are saved even after refreshing the page');
        const count = await page.$eval("textarea", notes => notes);
        //await page.reload();

        //expect(count).toBe("20");
      }, 50000);
  });
  