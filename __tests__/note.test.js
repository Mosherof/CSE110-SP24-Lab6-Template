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
      const notes = await page.$$eval("textarea");
      expect(notes).toBe("20");
    }, 50000);

    // Checking a new note can be editted after being saved
    it('Checking new note can be editted', async () => {
        console.log('Checking new note can be editted');
       // expect(count).toBe("20");
      }, 50000);

    // Checking an existing note can be editted after being saved
    it('Checking existing note can be editted', async () => {
        console.log('Checking existing note can be editted');
        //expect(count).toBe("20");
      }, 50000);

    // Checking that notes are saved even after refreshing the page
    it('Checking notes are saved even after refreshing the page', async () => {
        console.log('Checking notes are saved even after refreshing the page');
        //expect(count).toBe("20");
      }, 50000);

    // Checking a note can be deleted
    it('Checking a note can be deleted', async () => {
        console.log('Checking a note can be deleted');
        //expect(count).toBe("20");
      }, 50000);
  });
  