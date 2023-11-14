import "../../aliases"

import Consumer from '@processes/consumer/consumer';
import Processor from '@processes/processor/processor';

new Processor().start();
new Consumer().start()