'use strict';

const userGmails = [
  { id: '155ff0c28f523279',
    snippet: 'I ordered a box of peanut brittle five weeks ago. ' +
    'Where is it?!!?!1! ​Irate McIraterson',
    From: 'Nicholas Barry <niko.barry@gmail.com>',
    Date: 'Mon, 18 Jul 2016 10:26:34 -0700',
    Subject: 'Where\'s my order?!', },
  { id: '156007a054cd1e85',
    snippet: 'I\'m curious about MakerSquare. What does it take to become a student? Elyse',
    Date: 'Mon, 18 Jul 2016 03:24:15 -0700',
    Subject: 'How can I prepare to join MakerSquare?',
    From: 'Elyse Green <elgreen@ucdavis.edu>', },
  { id: '15600da6a5a356d1',
    snippet: 'On behalf of our company, RSquare, I demand that you stop violating our trademark' +
    ' with your "Make RSquare" website. If you don\'t, I\'ll have to serve you with a cease and' +
    ' desist letter. Alfred Pennyworth General Counsel RSquare, Inc.',
    Date: 'Sun, 17 Jul 2016 03:14:14 -0700',
    Subject: 'Stop violating our trademark',
    From: 'Alfred Pennyworth <counsel@RealMakeRSquare.com>', },
  { id: '15600ce057529519',
    snippet: 'Remember Sloth from The Goonies? https://www.youtube.com/watch?v=4Vv5CsP1pAg',
    Date: 'Sat, 16 Jul 2016 18:33:42 -0700',
    Subject: 'Hey You Guys!',
    From: 'SiLLyJustin <sillyjustin@gmail.com>', },
  { id: '15600cef9e3300c8',
    snippet: 'This message is intended to be private and had better not be up on ' +
    'some projector somewhere...or I\'ll sue!!!',
    Date: 'Sat, 16 Jul 2016 02:37:47 -0700',
    Subject: 'Customer complaint',
    From: 'Bonnie Torre <torre.bonnie@gmail.com>', },
  { id: '15600cf8f641ed01',
    snippet: 'I know a lot of Pokemon tricks...',
    Date: 'Fri, 15 Jul 2016 18:55:11 -0700',
    Subject: 'FB: Hey can you be my friend?',
    From: 'Justin M Lien <lien.justin.m@gmail.com>', },
  { id: '15600d20e83e7fa1',
    snippet: 'Gabriel Tramullas is the best! https://www.youtube.com/watch?v=XVPNUIJjG5E',
    Date: 'Fri, 15 Jul 2016 02:44:04 -0700',
    Subject: 'Watch this aerial rope act!!!',
    From: 'John Slape <slape.john@gmail.com>', },
  { id: '15600d2b0de3d49b',
    snippet: 'My favorite Epic Rap Battle! You have to watch this: ' +
    'https://www.youtube.com/watch?v=KfkR5o_bcSg',
    Date: 'Thu, 14 Jul 2016 17:53:43 -0700',
    Subject: 'Hannibal vs Jack the Ripper',
    From: 'John Slape <slape.john@gmail.com>', },
];

// Fetch latest 10 emails and show the snippet
//const Gmail = require('node-gmail-api');
//const gmail = new Gmail(process.env.GMAIL_ACCESS_TOKEN);
//const search = gmail.messages('label:inbox',
//  { max: 100, fields: ['id', 'internalDate', 'labelIds', 'payload', 'snippet'] });
//
//search.on('data', function (data) {
//  const msg = {
//    id: data.id,
//    snippet: data.snippet,
//  };
//
//  for (let i = 0; i < data.payload.headers.length; i++) {
//    const headerName = data.payload.headers[i].name;
//    const desiredHeaders = ['From', 'Date', 'Subject'];
//    if (~desiredHeaders.indexOf(headerName)) {
//      msg[headerName] = data.payload.headers[i].value;
//    }
//  }
//
//  console.log(msg);
//});
//
//search.on('error', function (err) {
//  console.error('Error retrieving Gmails: ', err);
//});

exports.getEmails = (req, res) => {
  res.send(userGmails);
};
