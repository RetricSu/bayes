# what is this?

this is a bayes filter amining to find out which twittee is related with crypto subject in a giving twittee list.

# how does it work?

the bayes filter algo is designed through a not-so-complicated probability theory.

the ultimately formula is **P1P2P3P4P5 / (P1P2P3P4P5 + (1-P1)(1-P2)(1-P3)(1-P4)(1-P5))**

P1...P5 stands for five most crypto-subject related words probability.

# refference

[1] http://www.ruanyifeng.com/blog/2011/08/bayesian_inference_part_one.html

[2] http://www.ruanyifeng.com/blog/2011/08/bayesian_inference_part_two.html

[3] https://github.com/gongxijun/smsTrash/blob/master/bayes/emailTrash.py