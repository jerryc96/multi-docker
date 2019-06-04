const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function fib(index) {
	let a = 0;
	let b = 1;
	if (index < 0) console.log("incorrect input");
	else if (index === 0) return a;
	else if (index === 1) return b;
	else {
		for (let i=2; i<index+1; i++){
			let c = a + b;
			a = b;
			b = c;
		}
		return b;
	}
}

sub.on('message', (channel, message) => {
  console.log('worker is working')
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
