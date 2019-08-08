const yargs = require('yargs');
const notesService = require('./notes');

//yargs version guncelleme
yargs.version('2.0')

// komutlar
//add
yargs.command({
  command: 'add',
  describe: 'Bir not ekleme',
  builder: {
    title: {
      describe: 'Notunuzun basligi',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Notununuz girin',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notesService.addNote(argv.title, argv.body);
  }
});

//remove
yargs.command({
  command: 'remove',
  describe: 'Bu notu silme',
  builder: {
    title: {
      describe: 'Silinecek notun basligi',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notesService.removeNote(argv.title);
  }
});

//list all
yargs.command({
  command: 'list',
  describe: 'notlari listeleme',
  handler: () => {
    console.log(notesService.getNotes());
  }
});

//get
yargs.command({
  command: 'get',
  describe: 'notu getirme',
  builder: {
    title: {
      describe: 'Getirilmesi istenen notun basligi',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    const note = notesService.getNote(argv.title);
    console.log(note);
  }
});

yargs.parse();
