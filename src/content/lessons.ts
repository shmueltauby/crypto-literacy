export type LessonColor = 'amber' | 'blue' | 'purple' | 'green' | 'teal' | 'red';

type CompareSide = { emoji: string; title: string; points: string[] };

export type Visual =
  /** A row of large emoji that tells a tiny story. */
  | { kind: 'scene'; emojis: string[]; caption?: string }
  | { kind: 'compare'; left: CompareSide; right: CompareSide }
  | { kind: 'flow'; steps: { emoji: string; label: string }[] }
  | { kind: 'stat'; value: string; label: string }
  /** One bank in the middle versus many connected computers. */
  | { kind: 'network' }
  /** A row of linked blocks the reader can tamper with. */
  | { kind: 'chain' }
  /** An example 12-word seed phrase. */
  | { kind: 'seed' }
  /** Cards that show a verdict when tapped. */
  | { kind: 'reveal'; items: { emoji: string; label: string; verdict: string; good: boolean }[] }
  /** A "what would you do?" moment. Nothing is scored. */
  | { kind: 'choice'; options: { label: string; reply: string; good: boolean }[] }
  | { kind: 'takeaways'; items: { emoji: string; text: string }[] };

export type Card = { title: string; text?: string; visual: Visual };

export type Lesson = {
  id: string;
  emoji: string;
  color: LessonColor;
  title: string;
  summary: string;
  minutes: number;
  cards: Card[];
};

export const lessons: Lesson[] = [
  {
    id: 'what-is-crypto',
    emoji: '🪙',
    color: 'amber',
    title: 'What is crypto?',
    summary: 'Money with no bank in the middle.',
    minutes: 2,
    cards: [
      {
        title: 'Pay by card and no coins move',
        text: 'Your bank just changes two numbers. Everyone trusts the bank to keep score.',
        visual: { kind: 'scene', emojis: ['💳', '➡️', '🏦', '➡️', '🏪'] },
      },
      {
        title: 'Crypto has no scorekeeper',
        text: 'Thousands of computers hold the same record and check each other.',
        visual: { kind: 'network' },
      },
      {
        title: 'Same idea, different rules',
        visual: {
          kind: 'compare',
          left: { emoji: '🏦', title: 'Bank', points: ['Has opening hours', 'Can undo mistakes', 'Needs to approve you'] },
          right: { emoji: '🌐', title: 'Crypto', points: ['Never closes', 'Payments are final', 'Open to anyone'] },
        },
      },
      {
        title: 'You sent crypto to the wrong person. Who can undo it?',
        visual: {
          kind: 'choice',
          options: [
            { label: 'The crypto helpline', reply: 'There isn’t one. No company runs the network.', good: false },
            { label: 'My bank', reply: 'Banks don’t control the blockchain, so they can’t reverse it.', good: false },
            { label: 'Nobody', reply: 'Exactly. That freedom comes with responsibility.', good: true },
          ],
        },
      },
      {
        title: 'In a nutshell',
        visual: {
          kind: 'takeaways',
          items: [
            { emoji: '🌐', text: 'No single company or government runs it' },
            { emoji: '⏰', text: 'It works any time, anywhere' },
            { emoji: '⚠️', text: 'Mistakes usually can’t be undone' },
          ],
        },
      },
    ],
  },
  {
    id: 'how-blockchains-work',
    emoji: '⛓️',
    color: 'blue',
    title: 'How a blockchain works',
    summary: 'The shared notebook nobody can secretly edit.',
    minutes: 2,
    cards: [
      {
        title: 'A notebook everyone shares',
        text: 'Payments are written on pages called blocks. Everyone holds the same copy.',
        visual: { kind: 'scene', emojis: ['📒', '📒', '📒'], caption: 'Same notebook, thousands of copies' },
      },
      {
        title: 'Try to cheat',
        text: 'Each block carries a fingerprint of the one before it. Tap a block to change it.',
        visual: { kind: 'chain' },
      },
      {
        title: 'Who adds the next block?',
        visual: {
          kind: 'compare',
          left: { emoji: '⛏️', title: 'Proof of work', points: ['Used by Bitcoin', 'Computers compete', 'Costs electricity'] },
          right: { emoji: '🔒', title: 'Proof of stake', points: ['Used by Ethereum', 'Lock coins as a deposit', 'Cheat and you lose it'] },
        },
      },
      {
        title: 'It’s all on show',
        text: 'Tap to see what anyone can look up.',
        visual: {
          kind: 'reveal',
          items: [
            { emoji: '📬', label: 'Your address', verdict: 'Public. Anyone can see it.', good: false },
            { emoji: '💸', label: 'Every payment you make', verdict: 'Public, and it stays there forever.', good: false },
            { emoji: '🪪', label: 'Your name', verdict: 'Hidden, unless someone links it to your address.', good: true },
          ],
        },
      },
      {
        title: 'In a nutshell',
        visual: {
          kind: 'takeaways',
          items: [
            { emoji: '🔗', text: 'Blocks are chained by fingerprints' },
            { emoji: '🚫', text: 'Change the past and the chain breaks' },
            { emoji: '👀', text: 'Private-ish, never anonymous' },
          ],
        },
      },
    ],
  },
  {
    id: 'coins-and-tokens',
    emoji: '🌐',
    color: 'purple',
    title: 'Bitcoin, Ethereum and the rest',
    summary: 'Why there are thousands of coins.',
    minutes: 2,
    cards: [
      {
        title: 'Bitcoin: digital gold',
        text: 'Launched in 2009. It does one job: store and move value.',
        visual: { kind: 'stat', value: '21 million', label: 'bitcoins will ever exist' },
      },
      {
        title: 'Ethereum: a blockchain that runs apps',
        text: 'Lending, trading and games, with no company in the middle.',
        visual: {
          kind: 'flow',
          steps: [
            { emoji: '📝', label: 'Someone writes a smart contract' },
            { emoji: '⚙️', label: 'It runs by itself, exactly as written' },
            { emoji: '🤝', label: 'Strangers can deal without a middleman' },
          ],
        },
      },
      {
        title: 'Stablecoins: built to stay at $1',
        text: 'Most are backed by a company’s reserves, so you are trusting that company.',
        visual: { kind: 'scene', emojis: ['🪙', '🟰', '💵'] },
      },
      {
        title: 'Does this prove a token is trustworthy?',
        text: 'Anyone can make a token in minutes. Tap each sign.',
        visual: {
          kind: 'reveal',
          items: [
            { emoji: '📈', label: 'The price is shooting up', verdict: 'No. Hype moves prices too.', good: false },
            { emoji: '⭐', label: 'A celebrity promotes it', verdict: 'No. They are often paid to.', good: false },
            { emoji: '👥', label: 'Everyone is talking about it', verdict: 'No. Popular is not the same as safe.', good: false },
          ],
        },
      },
      {
        title: 'In a nutshell',
        visual: {
          kind: 'takeaways',
          items: [
            { emoji: '🥇', text: 'Bitcoin is scarce digital money' },
            { emoji: '⚙️', text: 'Ethereum runs programs' },
            { emoji: '🤔', text: 'Most other tokens deserve suspicion' },
          ],
        },
      },
    ],
  },
  {
    id: 'wallets-and-keys',
    emoji: '🔑',
    color: 'green',
    title: 'Wallets, keys and seed phrases',
    summary: 'What it really means to own crypto.',
    minutes: 2,
    cards: [
      {
        title: 'A wallet holds keys, not coins',
        text: 'Your coins live on the blockchain. The key proves they are yours.',
        visual: { kind: 'scene', emojis: ['👛', '🔑'], caption: 'Whoever has the key controls the coins' },
      },
      {
        title: 'Safe to share?',
        text: 'Tap each one to find out.',
        visual: {
          kind: 'reveal',
          items: [
            { emoji: '📬', label: 'Your address', verdict: 'Yes. It works like an account number.', good: true },
            { emoji: '🔑', label: 'Your private key', verdict: 'Never. It controls your coins.', good: false },
            { emoji: '📝', label: 'Your seed phrase', verdict: 'Never. It is the backup of every key.', good: false },
          ],
        },
      },
      {
        title: '12 words that are everything',
        text: 'Anyone who sees them can take it all. Lose them and nobody can help.',
        visual: { kind: 'seed' },
      },
      {
        title: 'Where should those words live?',
        visual: {
          kind: 'compare',
          left: { emoji: '✅', title: 'Good', points: ['Written on paper', 'Hidden somewhere private'] },
          right: { emoji: '❌', title: 'Risky', points: ['A photo on your phone', 'Email or notes app', 'Cloud storage'] },
        },
      },
      {
        title: '“Support” asks for your seed phrase to fix a bug. You…',
        visual: {
          kind: 'choice',
          options: [
            { label: 'Send it so they can help', reply: 'They would empty your wallet in seconds.', good: false },
            { label: 'Ask them to prove who they are', reply: 'Scammers fake proof easily. The request itself is the giveaway.', good: false },
            { label: 'Block them', reply: 'Right. Nobody genuine ever needs your seed phrase.', good: true },
          ],
        },
      },
      {
        title: 'In a nutshell',
        visual: {
          kind: 'takeaways',
          items: [
            { emoji: '📬', text: 'Share your address freely' },
            { emoji: '🤐', text: 'Never share a key or seed phrase' },
            { emoji: '📄', text: 'Keep the seed phrase on paper, offline' },
          ],
        },
      },
    ],
  },
  {
    id: 'exchanges-and-custody',
    emoji: '🏦',
    color: 'teal',
    title: 'Exchanges and who holds your coins',
    summary: 'An account is not the same as a wallet.',
    minutes: 2,
    cards: [
      {
        title: 'An exchange swaps money for crypto',
        text: 'You log in with an email and password, like an online broker.',
        visual: {
          kind: 'flow',
          steps: [
            { emoji: '💵', label: 'You send regular money' },
            { emoji: '🏢', label: 'The exchange finds a seller' },
            { emoji: '🪙', label: 'Crypto shows in your account' },
          ],
        },
      },
      {
        title: 'So who holds the keys?',
        visual: {
          kind: 'compare',
          left: { emoji: '🏢', title: 'The exchange', points: ['Password can be reset', 'Can be hacked or frozen', 'They owe you the coins'] },
          right: { emoji: '👛', title: 'You', points: ['Nobody can freeze it', 'No reset button', 'Safety is on you'] },
        },
      },
      {
        title: 'Every transaction pays a fee',
        text: 'The fee goes to the network, and it climbs when things get busy.',
        visual: { kind: 'scene', emojis: ['🚗', '🚕', '🚙', '⛽'], caption: 'More traffic, higher fee' },
      },
      {
        title: 'You are about to hit send. What do you double-check?',
        visual: {
          kind: 'choice',
          options: [
            { label: 'Just the amount', reply: 'The amount matters, but a wrong address loses everything.', good: false },
            { label: 'Nothing, I can cancel later', reply: 'There is no cancel. Sent means sent.', good: false },
            { label: 'The address and the network', reply: 'Yes. Get either one wrong and the coins are usually gone.', good: true },
          ],
        },
      },
      {
        title: 'In a nutshell',
        visual: {
          kind: 'takeaways',
          items: [
            { emoji: '🏢', text: 'On an exchange, they hold the keys' },
            { emoji: '👛', text: 'In your own wallet, you do' },
            { emoji: '🔍', text: 'Check address and network before sending' },
          ],
        },
      },
    ],
  },
  {
    id: 'scams-and-safety',
    emoji: '🛡️',
    color: 'red',
    title: 'Scams and staying safe',
    summary: 'The tricks that catch most people.',
    minutes: 2,
    cards: [
      {
        title: 'Guaranteed profit means scam',
        text: 'Nobody can promise returns. Early payouts come from newer victims.',
        visual: { kind: 'stat', value: '“2% a day”', label: 'is a promise only scammers make' },
      },
      {
        title: 'Spot the red flag',
        text: 'Tap each message to see the trick behind it.',
        visual: {
          kind: 'reveal',
          items: [
            { emoji: '⏰', label: '“Act now or miss out!”', verdict: 'Urgency stops you thinking.', good: false },
            { emoji: '🤫', label: '“Keep this between us”', verdict: 'Secrecy stops you asking for advice.', good: false },
            { emoji: '🎁', label: '“Send 1 coin, get 2 back”', verdict: 'Giveaways like this are always fake.', good: false },
          ],
        },
      },
      {
        title: 'The long con',
        text: 'It can take weeks, which is why it works.',
        visual: {
          kind: 'flow',
          steps: [
            { emoji: '💬', label: 'A friendly stranger messages you' },
            { emoji: '📈', label: 'They show you an “amazing” trading app' },
            { emoji: '🤑', label: 'It displays huge fake profits' },
            { emoji: '🚫', label: 'You can never withdraw' },
          ],
        },
      },
      {
        title: 'A site says you made $5,000, but wants $200 to withdraw. You…',
        visual: {
          kind: 'choice',
          options: [
            { label: 'Pay the fee', reply: 'Then comes another fee, and another. The $5,000 never existed.', good: false },
            { label: 'Message their support', reply: 'Support is the scammer too.', good: false },
            { label: 'Walk away', reply: 'Right. The profit is invented and the fee is the real target.', good: true },
          ],
        },
      },
      {
        title: 'In a nutshell',
        visual: {
          kind: 'takeaways',
          items: [
            { emoji: '🙅', text: 'No guaranteed returns, ever' },
            { emoji: '🐢', text: 'Slow down when someone rushes you' },
            { emoji: '📭', text: 'If the offer found you, assume it is a scam' },
          ],
        },
      },
    ],
  },
];

export function getLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}
