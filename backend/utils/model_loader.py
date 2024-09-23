{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import numpy as np\n",
    "import joblib\n",
    "from sklearn.ensemble import GradientBoostingClassifier\n",
    "\n",
    "def load_logistic_model(model_path='logistic_model.pkl'):\n",
    "    logistic_model = joblib.load(model_path)\n",
    "    return logistic_model\n",
    "\n",
    "def train_gb_model():\n",
    "    gb = GradientBoostingClassifier()\n",
    "    gb.fit(np.random.rand(1000, 10), np.random.randint(2, size=1000))\n",
    "    return gb\n"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.10.8"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
