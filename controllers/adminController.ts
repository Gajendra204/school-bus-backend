import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Student from '../models/Student';
import Bus from '../models/Bus';
import Route from '../models/Route';

class TransportController {
  async addUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, role } = req.body;

    try {
      if (!['driver', 'parent'].includes(role)) {
        res.status(400).json({ message: 'Invalid role type' });
        return;
      }

      const existing = await User.findOne({ email });
      if (existing) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();

      res.status(201).json({ message: `${role} created successfully`, user: newUser });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async getUsersByRole(req: Request, res: Response): Promise<void> {
    const { role } = req.params;

    if (!['driver', 'parent'].includes(role)) {
      res.status(400).json({ message: 'Invalid role type' });
      return;
    }

    try {
      const users = await User.find({ role });
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({ message: 'User deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async addStudent(req: Request, res: Response): Promise<void> {
    const { name, class: studentClass, rollNumber, parentId } = req.body;

    try {
      const student = new Student({ name, class: studentClass, rollNumber, parent: parentId });
      await student.save();
      res.status(201).json({ message: 'Student added successfully', student });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await Student.find().populate('parent', 'name email');
      res.json(students);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }

      res.json({ message: 'Student deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  
}

export default new TransportController();
