export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  sections: { heading: string; body: string }[];
  quiz: QuizQuestion[];
};

export const lessons: Lesson[] = [
  {
    id: 'what-is-crypto',
    title: 'What is crypto?',
    summary: 'Digital money that no single company or government runs.',
    minutes: 3,
    sections: [
      {
        heading: 'Money you already use is mostly digital',
        body: 'When you pay by card, no coins move. Your bank lowers the number in your account and the shop’s bank raises theirs. The banks keep the records, and everyone trusts them to keep those records honestly.',
      },
      {
        heading: 'Crypto removes the middleman',
        body: 'A cryptocurrency is digital money whose records are kept by thousands of computers around the world instead of by one bank. They all hold the same copy of the record book and check each other’s work, so no single party can quietly change it.',
      },
      {
        heading: 'What that changes for you',
        body: 'You can send value to anyone with an internet connection, at any hour, without asking permission. The trade-off is responsibility: there is usually no helpline that can reverse a mistake or recover a lost password.',
      },
    ],
    quiz: [
      {
        question: 'Who keeps the records for a cryptocurrency like Bitcoin?',
        options: ['One central bank', 'A network of many computers', 'The company that invented it'],
        answerIndex: 1,
        explanation: 'Thousands of independent computers hold the same record book and verify each other.',
      },
      {
        question: 'What is the main trade-off of using crypto directly?',
        options: [
          'It only works during business hours',
          'You need permission from a bank',
          'Mistakes are usually not reversible',
        ],
        answerIndex: 2,
        explanation: 'With no middleman, there is usually nobody who can undo a payment or reset your access.',
      },
    ],
  },
  {
    id: 'how-blockchains-work',
    title: 'How a blockchain works',
    summary: 'The shared record book behind every cryptocurrency.',
    minutes: 4,
    sections: [
      {
        heading: 'A record book in pages',
        body: 'A blockchain is a list of transactions grouped into pages called blocks. Every new block includes a fingerprint of the block before it, which links them into a chain.',
      },
      {
        heading: 'Why it is hard to cheat',
        body: 'If someone changes an old transaction, that block’s fingerprint changes and no longer matches the next block. Every other computer on the network would see the mismatch and reject the altered copy.',
      },
      {
        heading: 'Who adds new blocks',
        body: 'Networks need a rule for who gets to add the next block. Bitcoin uses proof of work, where computers called miners compete using electricity. Ethereum uses proof of stake, where validators lock up coins as a deposit they lose if they cheat.',
      },
      {
        heading: 'Public by default',
        body: 'Most blockchains are open for anyone to read. Your name is not attached, but every transaction of an address is visible forever. Crypto is pseudonymous, not anonymous.',
      },
    ],
    quiz: [
      {
        question: 'What links one block to the next?',
        options: [
          'Each block contains a fingerprint of the previous block',
          'A bank signs every block',
          'Blocks are stored in the same folder',
        ],
        answerIndex: 0,
        explanation: 'That fingerprint (a hash) is why changing old data breaks the chain.',
      },
      {
        question: 'Are transactions on most blockchains private?',
        options: [
          'Yes, nobody can see them',
          'No, anyone can see them, though names are not attached',
          'Only the government can see them',
        ],
        answerIndex: 1,
        explanation: 'Addresses are public and permanent. If an address is linked to you, your history is visible.',
      },
      {
        question: 'What do proof-of-stake validators risk if they cheat?',
        options: ['Their electricity bill', 'Nothing', 'The coins they locked up as a deposit'],
        answerIndex: 2,
        explanation: 'Staked coins act as a security deposit that can be taken away for dishonest behaviour.',
      },
    ],
  },
  {
    id: 'coins-and-tokens',
    title: 'Bitcoin, Ethereum and everything else',
    summary: 'Why there are thousands of coins and how they differ.',
    minutes: 4,
    sections: [
      {
        heading: 'Bitcoin',
        body: 'Bitcoin launched in 2009 and does one job: move and store value. Its supply is capped at 21 million coins, which is why people compare it to digital gold.',
      },
      {
        heading: 'Ethereum',
        body: 'Ethereum is a blockchain that can also run programs, called smart contracts. These programs let people build apps for lending, trading, games and more without a company in the middle. Its coin is called ether (ETH).',
      },
      {
        heading: 'Stablecoins',
        body: 'A stablecoin is a token designed to stay worth one unit of a regular currency, usually one US dollar. Most are backed by reserves held by a company, so they depend on that company actually holding what it claims.',
      },
      {
        heading: 'Everything else',
        body: 'Anyone can create a token in minutes, so thousands exist. Some power real products. Many have no purpose beyond speculation, and some are created only to take buyers’ money. A token existing, or its price rising, says nothing about whether it is trustworthy.',
      },
    ],
    quiz: [
      {
        question: 'What can Ethereum do that Bitcoin was not designed for?',
        options: ['Run programs called smart contracts', 'Work without the internet', 'Guarantee a stable price'],
        answerIndex: 0,
        explanation: 'Smart contracts are programs stored on the blockchain that run exactly as written.',
      },
      {
        question: 'What is a stablecoin meant to do?',
        options: ['Double in value each year', 'Hold a steady value, usually one US dollar', 'Replace Bitcoin'],
        answerIndex: 1,
        explanation: 'Stablecoins aim to track a regular currency, but they rely on whoever backs them.',
      },
    ],
  },
  {
    id: 'wallets-and-keys',
    title: 'Wallets, keys and seed phrases',
    summary: 'What it really means to own crypto.',
    minutes: 4,
    sections: [
      {
        heading: 'A wallet holds keys, not coins',
        body: 'Your coins live on the blockchain. A wallet stores the private key that proves they are yours and lets you send them. Whoever has the private key controls the coins.',
      },
      {
        heading: 'Address and private key',
        body: 'Your address is like an account number: safe to share so people can pay you. Your private key is like the PIN and signature combined: never share it with anyone, for any reason.',
      },
      {
        heading: 'The seed phrase',
        body: 'When you create a wallet you get a seed phrase, usually 12 or 24 ordinary words. It is a backup of all your keys. Anyone who sees it can take everything, and if you lose it along with your device, nobody can recover your coins.',
      },
      {
        heading: 'Keeping it safe',
        body: 'Write the seed phrase on paper and store it somewhere private. Do not photograph it, email it, or save it in a notes app or cloud drive. No genuine company or support agent will ever ask for it.',
      },
    ],
    quiz: [
      {
        question: 'Which of these is safe to share with someone who wants to pay you?',
        options: ['Your seed phrase', 'Your private key', 'Your address'],
        answerIndex: 2,
        explanation: 'An address only lets people send you funds. The key and seed phrase give full control.',
      },
      {
        question: 'A support agent asks for your seed phrase to fix a problem. What is happening?',
        options: ['It is a scam', 'It is a normal security check', 'It is required once a year'],
        answerIndex: 0,
        explanation: 'Nobody legitimate ever needs your seed phrase. Anyone asking for it is trying to steal from you.',
      },
      {
        question: 'Where is the best place to keep a seed phrase?',
        options: ['A photo on your phone', 'Written on paper, stored privately', 'In an email to yourself'],
        answerIndex: 1,
        explanation: 'Offline storage keeps it away from hackers and malware.',
      },
    ],
  },
  {
    id: 'exchanges-and-custody',
    title: 'Exchanges and who holds your coins',
    summary: 'The difference between an account and a wallet.',
    minutes: 3,
    sections: [
      {
        heading: 'What an exchange does',
        body: 'An exchange is a company where you swap regular money for crypto. It works like an online brokerage: you log in with an email and password and see a balance.',
      },
      {
        heading: 'Custodial: they hold the keys',
        body: 'On an exchange, the company holds the private keys and owes you the coins. This is convenient and you can reset a forgotten password, but if the company is hacked, freezes withdrawals or fails, your coins can be stuck or lost.',
      },
      {
        heading: 'Self-custody: you hold the keys',
        body: 'With your own wallet, only you can move the coins. No company can freeze or lose them, but the safety of the seed phrase is entirely on you.',
      },
      {
        heading: 'Fees and sending',
        body: 'Every blockchain transaction pays a network fee, which rises when the network is busy. Before sending, check the address and the network carefully. Coins sent to the wrong address or on the wrong network are usually gone for good.',
      },
    ],
    quiz: [
      {
        question: 'Who holds the private keys for coins kept on an exchange?',
        options: ['You do', 'The exchange does', 'Nobody does'],
        answerIndex: 1,
        explanation: 'The exchange controls the keys and owes you the balance, much like a bank.',
      },
      {
        question: 'What should you always check before sending crypto?',
        options: ['The address and the network', 'The weather', 'Nothing, it can be reversed later'],
        answerIndex: 0,
        explanation: 'Transactions are final. A wrong address or network usually means the coins are lost.',
      },
    ],
  },
  {
    id: 'scams-and-safety',
    title: 'Scams and staying safe',
    summary: 'The tricks that catch most people, and how to spot them.',
    minutes: 4,
    sections: [
      {
        heading: 'Guaranteed returns',
        body: 'Nobody can promise a fixed profit from crypto. Offers such as “2% a day” or “double your coins” are paid, if at all, with money from newer victims until the scheme collapses.',
      },
      {
        heading: 'Fake support and fake websites',
        body: 'Scammers copy real websites and pose as support staff on social media. They ask for your seed phrase or tell you to “verify” your wallet. Type web addresses yourself, and never follow links from messages.',
      },
      {
        heading: 'Romance and friendship scams',
        body: 'Someone you meet online builds trust over weeks, then introduces a trading platform that shows large fake profits. When you try to withdraw, there are endless fees and the money is gone.',
      },
      {
        heading: 'Simple rules that block most scams',
        body: 'Never share a seed phrase. Be suspicious of urgency and secrecy. Do not send crypto to someone who promises to send more back. If you did not go looking for an offer and it found you, treat it as a scam until proven otherwise.',
      },
    ],
    quiz: [
      {
        question: 'An account promises to send back double any crypto you send. What should you do?',
        options: ['Send a small amount to test it', 'Ignore it, it is a scam', 'Send quickly before the offer ends'],
        answerIndex: 1,
        explanation: 'Giveaway doubling offers are always scams, including the ones that seem to pay small test amounts.',
      },
      {
        question: 'Which is a warning sign of a scam?',
        options: [
          'Pressure to act fast and keep it secret',
          'A website you typed in yourself',
          'A fee shown before you confirm a transaction',
        ],
        answerIndex: 0,
        explanation: 'Urgency and secrecy are designed to stop you thinking or asking someone you trust.',
      },
      {
        question: 'A platform shows big profits but asks for a fee before you can withdraw. What is most likely true?',
        options: ['The profits are real', 'It is a tax requirement', 'The profits are fake and the fee will be stolen too'],
        answerIndex: 2,
        explanation: 'Fake platforms display invented balances and keep inventing fees until you stop paying.',
      },
    ],
  },
];

export function getLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}
